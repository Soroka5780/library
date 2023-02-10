import { useRouter } from "next/router";
import styles from '../styles/Student.module.css';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import MUIDataTable from "mui-datatables";


const Student = () => {
  const [students, setStudents] = useState([]);
  const apiEndPoint = 'http://localhost:3000/student/';
  useEffect(() => {
    const getUsers = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setStudents(res);
    };
    getUsers();
  }, []);

  let selectedStudent;

  const columns = [
    {
      name: "ec_student",
      label: "ec student",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "ec_kniznica",
      label: "ec kniznica",
      options: {
        filter: true,
        sort: true,
      }
    },
    
    {
      name: "meno",
      label: "meno",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "priezvisko",
      label: "priezvisko",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "ulica",
      label: "ulica",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "mesto",
      label: "mesto",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "email",
      label: "email",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "kontakt",
      label: "kontakt",
      options: {
        filter: true,
        sort: true,
      }
    },
  ];

  const options = {
    filterType: 'checkbox',

    onRowClick: (rowData,) => {
      const index = rowData[0];
      router.push(`/student/${index}`);
    },
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach(el => {
        axios.delete(`${apiEndPoint}${students[el.index].ec_student}`).then(window.alert('Deleted uspesne vymazane!'));
      });
    },
    onRowsSelect: dataIndex => selectedStudent = dataIndex,
  }


  const router = useRouter();
  const newUsers = () => {
    router.push("/New_Student");
  }

  const vyluceniestudenta = () => {
        
    const data =
    {
        "vylucenie": 1,
    };
    axios.patch(`http://localhost:3000/student/${students[selectedStudent[0].index].ec_student}`, data);
    Router.reload(window.location.pathname)
};

  
  return (
    <div className={styles.div}>
      <button className={styles.button} onClick={newUsers}>Nový Študent</button>
      <button className={styles.button} onClick={vyluceniestudenta}>Vylučenie Študenta</button>
      <MUIDataTable
        title={"Student"}
        data={students}
        columns={columns}
        options={options}
      />
    </div>
  )

}

export default Student;