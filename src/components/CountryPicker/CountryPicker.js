import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import Select from "react-select";

import { fetchCountries } from "../../api";

import styles from "./CountryPicker.module.scss";

const Countries = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  const newOptions = countries.map(country => {
    return {
      value: country,
      label: country
    }
  })
  const handleChange = (selected) => {
    handleCountryChange(selected.value)
  }

  return (
    <FormControl className={styles.formControl}>
      <Select
          className="basic-single"
          defaultValue={countries[0]}
          isSearchable={true}
          options={newOptions}
          onChange={handleChange}
        />
    </FormControl>
  );
};

export default Countries;
