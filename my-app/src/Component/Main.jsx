import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Main.css';

const Main = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const url =
    'https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json';

  const getColors = async () => {
    await axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setData(data.colors);
        setFilteredData(data.colors); // Initialize filteredData with all data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    getColors();
  }, []);

  useEffect(() => {
 
    const filteredResults = data.filter(
      (item) =>
        item?.color?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        item?.hex?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [searchTerm, data]);

  return (
    <div>
      <div>
        <h1>All Colors</h1>
        <div>
          <input
            type="text"
            placeholder="Enter Color"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Color</th>
              <th>Name</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      background: `${item.hex}`,
                      borderRadius: '30px',
                    }}
                  ></div>
                </td>
                <td>{item.color}</td>
                <td>{item.hex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
