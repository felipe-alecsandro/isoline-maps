import React from 'react';
import './App.css';
import { MapContainer } from './MapContainer';
import { hereIsolineUrl, maxIsolineRangeLookup } from './here';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //Coordinates are in format [Latitude, Longitude]
      maps: [
        {
          name: 'São Paulo, SP',
          coordinates: [-23.5489, -46.6388],
          polygon: []
        }, {
          name: 'San Francisco, CA',
          coordinates: [37.761732, -122.440343],
          polygon: []
        }, {
          name: 'New York City, NY',
          coordinates: [40.734238, -73.988188],
          polygon: []
        }, {
          name: 'Berlin, Germany',
          coordinates: [52.520609, 13.409321],
          polygon: []
        }, {
          name: 'Chicago, IL',
          coordinates: [41.884314, -87.630478],
          polygon: []
        }, {
          name: 'Singapore, Singapore',
          coordinates: [1.347920, 103.862097],
          polygon: []
        }, {
          name: 'Buenos Aires, Argentina',
          coordinates: [-34.609855, -58.443259],
          polygon: []
        }, {
          name: 'Johannesburg, South Africa',
          coordinates: [-26.205689, 28.042450],
          polygon: []
        }, {
          name: 'Tokyo, Japan',
          coordinates: [35.652832, 139.839478],
          polygon: []
        }
      ],
      options: {
        zoom: 5,
        type: 'distance',
        range: 300000,
        mode: 'car',
        traffic: 'disabled',
        style: 'reduced.day'
      }
    };
  }

  updateIsolines = () => {
    const promises = this.state.maps.map(m => fetch(hereIsolineUrl(m.coordinates, this.state.options)).then(x => x.json()));
    Promise.all(promises).then(res => {
      const copy = this.state.maps.map((x, i) => {
        x.polygon = res[i].response.isoline[0].component[0].shape.map(x => [x.split(',')[0], x.split(',')[1]]);
        return x;
      });
      this.setState({
        maps: copy
      });
    });
  }

  componentDidMount = () => {
    this.updateIsolines();
  }

  handleDrag = (index, coordinates) => {
    fetch(hereIsolineUrl(coordinates, this.state.options))
      .then(res => res.json())
      .then(res => {
        const copy = this.state.maps.slice();
        if (res.hasOwnProperty('response')) {
          copy[index].polygon = res.response.isoline[0].component[0].shape.map(x => [x.split(',')[0], x.split(',')[1]]);
        } else {
          copy[index].polygon = [];
        }
        copy[index].coordinates = coordinates;
        this.setState({
          maps: copy
        });
      });
  }

  handleFormChange = (event) => {
    const option = event.target.id;
    const value = event.target.value;
    const copy = this.state.options;
    if (option === 'type' && this.state.options.range > maxIsolineRangeLookup[value]) {
      copy.range = maxIsolineRangeLookup[value];
    }
    copy[option] = value;
    this.setState({
      options: copy
    }, () => {
      this.updateIsolines();
    });

  }

  render() {

    const max = this.state.options.type === 'distance' ?
      maxIsolineRangeLookup.distance :
      maxIsolineRangeLookup.time;

    const sliderVal = this.state.options.range > max ? max : this.state.options.range;

    return (
      <div className="app">

        <div className="map-grid">
          {this.state.maps.map((map, index) =>
            <MapContainer
              key={index}
              index={index}
              center={map.coordinates}
              options={this.state.options}
              handleDrag={this.handleDrag}
              polygon={map.polygon}
              style={this.state.options.style}
            />
          )}

        </div>
      </div>
    );
  }
}

export default App