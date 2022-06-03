import Axios from "axios";
import { useState } from "react";
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

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

  const updateEmployeeWage = (id) => {
    //รับไอดีมาเพื่อจะได้เช็คได้ถูกตัว
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  //เช็คว่า id ที่อัพเดธมาตรงกันกับเป้าหมายมั้ย
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val; //ถ้า val.id != id ก็ return กลับค่าเดิมคือ val ที่ประกอบไปด้วย id, name, บลาๆ , wage เหมือนเดิม
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
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
              onChange={(event) => {
                //ใช้ onChange และเมื่อมี event
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
                <div className="flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder="15000..."
                    onChange={(event) => {
                      setNewWage(event.target.value);
                    }}
                  />
                  <button
                    style={{ background: "#FFDFD3" }}
                    className="btn btn-warining"
                    onClick={() => {
                      updateEmployeeWage(val.id);
                    }} //เมื่อกดปุ่มให้ส่งค่า val.id ไปเช็คในฟังชัน update ก่อนว่า id ตรงกันมั้ยแล้วทำต่อ
                  >
                    Update
                  </button>
                  <button
                    style={{ background: "#AFDFD3" }}
                    className="btn btn-danger"
                    onClick={() => {
                      deleteEmployee(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
