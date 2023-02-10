import { useRouter } from "next/router";
import styles from '../styles/vypozicka.module.css';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";



const Vypozicky = () => {
    const [vypozicky, setVypozicka] = useState([]);
    const apiEndPoint = 'http://localhost:3000/vypozicky/';
    useEffect(() => {
        const getVypozicka = async () => {
            const { data: res } = await axios.get(apiEndPoint);
            setVypozicka(res);
        };
        getVypozicka();
    }, []);

    const columns = [
        {
            name: "ec_vypozicka",
            label: "ec_vypozicka",
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
            name: "ec_kniha",
            label: "ec kniha",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "ec_student",
            label: "ec_student",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "datum_vypozicane",
            label: "datum_vypozicane",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "datum_predpokladane",
            label: "datum_predpokladane",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "datum_skutocne",
            label: "datum_skutocne",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    const options = {
        filterType: 'checkbox',
       
        onRowClick: (rowData, ) =>{
            const index = rowData[0];
            router.push(`/vypozicky/${index}`);
        },
        onRowsDelete:(rowsDeleted) => {
            rowsDeleted.data.forEach(el => {                           
                axios.delete(`${apiEndPoint}${vypozicky[el.index].ec_vypozicka}`).then(window.alert('Deleted uspesne vymazane!'));
            });           
        },

        onRowsSelect: dataIndex => console.log('rowSelect:' + dataIndex),
        
    }

    const router = useRouter();
    const newVypozicka = () => {
        router.push("/New_Vypozicka");
    }

    const historiaVypozcika = () => {
        router.push("/Historia_Vypozicka");
    }

    return (
    <div className={styles.div}>
        <button className={styles.button} onClick={newVypozicka}>Nová vypozicka</button>
        <button className={styles.button} onClick={historiaVypozcika}>Historia študenta</button>
        <MUIDataTable
            title={"Vypozicky"}
            data={vypozicky}
            columns={columns}
            options={options}
        />

    </div>
    )
};

export default Vypozicky;