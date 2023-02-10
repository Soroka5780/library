import { useRouter } from "next/router";
import styles from '../styles/Historia.module.css';
import React, { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import MUIDataTable from "mui-datatables";
import axios from "axios";



const Historia = () => {
    const router = useRouter();
    const [readKniznice, setReadKniznice] = useState(0);    
    const [readStudenti, setReadStudenti] = useState(0);    
    const [studenti, setStudenti] = useState([]);
    const [kniznice, setKniznice] = useState([]);
    const [vypozicky, setVypozicky] = useState([]);
    const [selectedKniznica, setselectedKniznica] = useState(1);
    const [selectedStudent, setselectedStudent] = useState(1);
    const apiEndPointKniznica = 'http://localhost:3000/kniznica/';
    const apiEndPointStudent = 'http://localhost:3000/student/kniznica/';
    const apiEndPointVypozicky = 'http://localhost:3000/vypozicky/historia/student/';

    const getKniznice = async () => {
        const   { data: res }   = await axios.get(apiEndPointKniznica);           
        setKniznice(res);           
    };
       
    const getStudenti = async () => {
        const  { data: res }   = await axios.get(`${apiEndPointStudent}${kniznice[selectedKniznica-1]?.ec_kniznica}`);  
        console.log('STUDENTI:',res);              
        setStudenti(res);
    };
    
    const getHistoriaVypoziciek = async () => {       
        const  { data: res }   = await axios.get(`${apiEndPointVypozicky}?kniznica=${kniznice[selectedKniznica-1]?.ec_kniznica}&student=${studenti[selectedStudent-1]?.ec_student}`);        
        setVypozicky(res);
    };

    useEffect(() => {               
        getKniznice();                  
    }, []);

    useEffect(() => {               
       if(kniznice.length != 0)
       {
            setReadKniznice(1);
       }           
       if(studenti.length !=0)
       {
            setReadStudenti(readStudenti + 1);            
       }      
       
    });

    useEffect(() => {                                       
        getStudenti();            
    },[readKniznice]);    

    useEffect(() => {                                       
        getHistoriaVypoziciek();            
    },[readStudenti]);    

    useEffect(() => {              
        while(studenti.length > 0) {
            studenti.pop();
        }                                                          
        getStudenti();        
    }, [selectedKniznica]);

    useEffect(() => {                           
        getHistoriaVypoziciek();
    }, [selectedKniznica,selectedStudent]);

    const columns = [
        {
            name: "ec_kniha",
            label: "ec_kniha",
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
                sort: true,
            }
        },
        {
            name: "datum_predpokladane",
            label: "datum_predpokladane",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "datum_skutocne",
            label: "datum_skutocne",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];

    const options = {
        filterType: 'checkbox',
    }



    return (
        <div className={styles.div}>
            <Listbox value={selectedKniznica} onChange={setselectedKniznica} >
                <Listbox.Button className={styles.Button}>{kniznice[selectedKniznica - 1]?.nazov}</Listbox.Button>
                <Listbox.Options>
                    {kniznice?.map((kniznica) => (
                        <Listbox.Option className={styles.Option}
                            key={kniznica.ec_kniznica}
                            value={kniznica.ec_kniznica}

                        >
                            {kniznica.nazov}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
            <Listbox value={selectedStudent} onChange={setselectedStudent} >
                <Listbox.Button className={styles.Button}>Eč:{studenti[selectedStudent - 1]?.ec_student}, {studenti[selectedStudent - 1]?.meno}  {studenti[selectedStudent - 1]?.priezvisko} </Listbox.Button>
                <Listbox.Options>
                    {studenti.map((student) => (
                        <Listbox.Option className={styles.Option}
                            key={student.ec_student}
                            value={student.ec_student}
                        >
                            Eč:{student.ec_student}, {student.meno}  {student.priezvisko}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>

            <MUIDataTable
                title={"Vypozicky"}
                data={vypozicky}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default Historia;