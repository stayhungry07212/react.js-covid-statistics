import React from "react";
import styles from "./App.module.scss";
import Cards from "../Cards/Cards";
import Chart from "../Chart/Chart";
import CountryPicker from "../CountryPicker/CountryPicker";
import { fetchData } from "../../api";
import coronaImage from '../../images/image.png'

class App extends React.Component {

  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData= await fetchData();
    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) => {
    const fetchedData= await fetchData(country);
    this.setState({ data: fetchedData, country: country })
  }

  render() {
    const { data, country } = this.state
     return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="Corona virus"/>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
      </div>
    );
  }

}

export default App;
