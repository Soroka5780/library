import { useRouter } from "next/router";
import styles from '../styles/Kniznica.module.css';
import MUIDataTable from "mui-datatables";
import axios from "axios";
import React, { useState, useEffect } from 'react';

const Kniznica = () => {
    const [kniznica, setKniznica] = useState([]);
    const apiEndPoint = 'http://localhost:3000/kniznica/';
    useEffect(() => {
        const getKniznica = async () => {
            const { data: res } = await axios.get(apiEndPoint);
            setKniznica(res);
        };
        getKniznica();        
    }, []);

    const columns = [
        {
            name: "ec_kniznica",
            label: "ec knižnica",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "nazov",
            label: "Názov",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ulica",
            label: "Ulica",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "mesto",
            label: "Mesto",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "email",
            label: "E-mail",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "kontakt",
            label: "Kontakt",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];

    const options = {
        filterType: 'checkbox',
       
        onRowClick: (rowData, ) =>{
            const index = rowData[0];
            router.push(`/kniznica/${index}`);
        },
        onRowsDelete:(rowsDeleted) => {
            rowsDeleted.data.forEach(el => {                           
                axios.delete(`${apiEndPoint}${kniznica[el.index].ec_kniznica}`);
            });           
        },

        onRowsSelect: dataIndex => console.log('rowSelect:' + dataIndex),
        
    }


    const router = useRouter();
    const newkniznica = () => {
        router.push("/New_Kniznica");
    }
   
    


    return (
        <div className={styles.div}>
            <button className={styles.button} onClick={newkniznica}>Nová Knižnica</button>
            <MUIDataTable
                title={"Kniznica"}
                data={kniznica}
                columns={columns}
                options={options}
            />
        </div>
    )
};

export default Kniznica;



