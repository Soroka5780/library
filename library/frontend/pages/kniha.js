import { useRouter } from "next/router";
import styles from '../styles/Kniha.module.css';
import axios from "axios";
import Router from 'next/router'
import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";



const Kniha = () => {
    const [knihy, setKnihy] = useState([]);
    const apiEndPoint = 'http://localhost:3000/kniha/';
    useEffect(() => {
        // definovanie metody
        const getKnihy = async () => {
            const   { data: res }  = await axios.get(apiEndPoint);
            setKnihy(res); 
        };
        // volanie mnetody
        getKnihy();
    }, []);

    let selectedKniha;

    const columns = [
        {
            name: "ec_kniha",
            label: "ec kniha",
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
            name: "nazov",
            label: "Názov",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "autor",
            label: "Autor",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "zaner",
            label: "Žáner",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "popis",
            label: "Popis",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    const options = {
        filterType: 'checkbox',

        onRowClick: (rowData,) => {
            const ec = rowData[0];
            router.push(`/kniha/${ec}`);
        },
        onRowsDelete: (rowsDeleted) => {
            rowsDeleted.data.forEach(el => {
                axios.delete(`${apiEndPoint}${knihy[el.index].ec_kniha}`);
            });
        },

        onRowsSelect: dataIndex => {
            selectedKniha = dataIndex;
        },
    }

    const router = useRouter();
    const newkniha = () => {
        router.push("/New_Kniha");
    };

    const vylucenieknihy = () => {
        
        const data =
        {
            "vylucenie": 1,
        };
        axios.patch(`http://localhost:3000/kniha/${knihy[selectedKniha[0].index].ec_kniha}`, data);
        Router.reload(window.location.pathname)
    };

    return (
        <div className={styles.div}>
            <button className={styles.button} onClick={newkniha}>Nová Kniha</button>
            <button className={styles.button} onClick={vylucenieknihy}>Vylučenie knihy</button>
            <MUIDataTable
                title={"Knihy"}
                data={knihy}
                columns={columns}
                options={options}
            />
        </div>
    )
};

export default Kniha;




