import Axios from "axios";
import { useState } from "react";
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };
  
  return (
    <div className="app container">
      <h1>Employee Information</h1>
      <div className="information">
        <form action="">
          <div className="a">
            <label htmlFor="name" className="form-lebel">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(event) => {          //ใช้ onChange และเมื่อมี event
                setName(event.target.value); //จะเรียก setName โดยรับค่าจาก event.target.value คือรับค่า event ที่ค่าเป้าหมายตอนนี้ target.value
              }}
            />
          </div>
          <div className="a">
            <label htmlFor="age" className="form-lebel">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Age"
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>
          <div className="a">
            <label htmlFor="country" className="form-lebel">
              Country:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Country"
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />
          </div>
          <div className="a">
            <label htmlFor="position" className="form-lebel">
              Position:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Position"
              onChange={(event) => {
                setPosition(event.target.value);
              }}
            />
          </div>
          <div className="a">
            <label htmlFor="wage" className="form-lebel">
              Wage:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Wage"
              onChange={(event) => {
                setWage(event.target.value);
              }}
            />
          </div>
          <button className="btn btn-success" onClick={addEmployee}>
            Add Employee
          </button>
        </form>
      </div>
      <hr />
      <div className="employee">
        <button className="btn btn-primary" onClick={getEmployees}>
          Show Employee
        </button>
        <br />
        <br />
        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Age: {val.age}</p>
                <p className="card-text">Country: {val.country}</p>
                <p className="card-text">Position: {val.position}</p>
                <p className="card-text">Wage: {val.wage}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
