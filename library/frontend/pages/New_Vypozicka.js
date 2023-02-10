import { useRouter } from "next/router";
import styles from '../styles/New_Vypozicka.module.css';
import React, { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import axios from "axios";

const VypozickaNew = () => {
    const router = useRouter();
    
    const [datum_vypozicane, setDatumVypozicane] = useState(new Date());        
    const [datum_predpokladane, setDatumPredpokladane] = useState(datum_vypozicane.getDate() + 30);   
    
    const [readKniznice, setReadKniznice] = useState(0);
    const [kniznice, setKniznice] = useState([]);
    const [knihy, setKnihy] = useState([]);
    const [studenti, setStudenti] = useState([]);
    const [selectedKniznica, setselectedKniznica] = useState(1);
    const [selectedKniha, setselectedKniha] = useState(1);
    const [selectedStudent, setselectedStudent] = useState(1);


    const apiEndPointKniznica = 'http://localhost:3000/kniznica/';
    const apiEndPointKniha = 'http://localhost:3000/kniha/kniznica/';
    const apiEndPointStudent = 'http://localhost:3000/student/kniznica/';

    const getKniznice = async () => {
        const   { data: res }   = await axios.get(apiEndPointKniznica);           
        setKniznice(res);           
    };
    
    const getKnihy = async () => {        
        console.log('GET KNIHY',JSON.stringify(kniznice))
        const  { data: res }   = await axios.get(`${apiEndPointKniha}${kniznice[selectedKniznica-1]?.ec_kniznica}`);        
        setKnihy(res);
    };
    const getStudenti = async () => {
        
        const  { data: res }   = await axios.get(`${apiEndPointStudent}${kniznice[selectedKniznica-1]?.ec_kniznica}`);                
        setStudenti(res);
    };

    useEffect(() => {               
        getKniznice();                  
    }, []);

    useEffect(() => {               
       if(kniznice.length != 0)
       {
        setReadKniznice(1);
       }                 
    });

    useEffect(() => {                                       
        getKnihy();
        getStudenti();            
    },[readKniznice]);    

    useEffect(() => {                              
        getKnihy();
        getStudenti();
    }, [selectedKniznica]);

   
    const handleSubmit = (event) => {
        event.preventDefault();        
    
        const data =
        {
            "ec_kniznica": `${kniznice[selectedKniznica-1].ec_kniznica}`,
            "ec_kniha": `${knihy[selectedKniha-1].ec_kniznica}`,
            "ec_student": `${studenti[selectedStudent-1].ec_kniznica}`,
            "datum_vypozicane": `${datum_vypozicane}`,
            "datum_predpokladane": `${datum_predpokladane}`
        };
        axios.post('http://localhost:3000/vypozicky/', data);
        router.push("/vypozicky");
    }

    const zrusitKniznica = (e) => {
        router.push("/vypozicky");
    }

    return (
        <div className={styles.div}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.h2}> NOVÁ VYPOŽIČKA KNIHY:</h2>
                <labe className={styles.labe} >Knižnica</labe>
                <p>
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
                </p>
                <labe className={styles.label} >Kniha</labe>
                <p>
                    <Listbox value={selectedKniha} onChange={setselectedKniha} >
                        <Listbox.Button className={styles.Button}>{knihy[selectedKniha - 1]?.nazov}</Listbox.Button>
                        <Listbox.Options>
                            {
                            knihy.map((kniha) => (
                                <Listbox.Option className={styles.Option}
                                    key={kniha.ec_kniha}
                                    value={kniha.ec_kniha}

                                >
                                    {kniha.nazov}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Listbox>
                </p>
                <labe className={styles.label} >Študent</labe>
                <p>
                    <Listbox value={selectedStudent} onChange={setselectedStudent} >
                        <Listbox.Button  className={styles.Button}>Eč:{studenti[selectedStudent - 1]?.ec_student}, {studenti[selectedStudent - 1]?.meno}  {studenti[selectedStudent - 1]?.priezvisko} </Listbox.Button>
                        <Listbox.Options>
                            {
                          
                            studenti.map((student) => (
                                <Listbox.Option className={styles.Option}
                                    key={student.ec_student}
                                    value={student.ec_student}
                                >
                                    Eč:{student.ec_student}, {student.meno}  {student.priezvisko}
                                </Listbox.Option>
                            ))
                            }
                        </Listbox.Options>
                    </Listbox>
                </p>                
                <button className={styles.button} onClick={zrusitKniznica} >Zrušiť</button>
                <button className={styles.button1}>Potvrdiť</button>
            </form>

        </div>
    );
}

export default VypozickaNew;