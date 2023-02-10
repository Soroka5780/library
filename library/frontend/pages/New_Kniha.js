import { useRouter } from "next/router";
import styles from '../styles/New_Kniha.module.css';
import React, { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import axios from "axios";

const KnihaNew = () => {
    const router = useRouter();
    const [kniznice, setKniznice] = useState([]);
    const [nazov, setNazov] = useState('');
    const [autor, setAutor] = useState('');
    const [zaner, setzaner] = useState('');
    const [popis, setPopis] = useState('');

    const apiEndPoint = 'http://localhost:3000/kniznica/';
    useEffect(() => {
        const getKniznica = async () => {
            const { data: res } = await axios.get(apiEndPoint);
            setKniznice(res);
        };
        getKniznica();
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        const ec = kniznice[selectedKniznica - 1].ec_kniznica;
        const data =
        {
            "ec_kniznica": `${ec}`,
            "nazov": `${nazov}`,
            "autor": `${autor}`,
            "zaner": `${zaner}`,
            "popis": `${popis}`,
        };

        axios.post('http://localhost:3000/kniha/', data);
        router.push("/kniha");

    }

    const zrusitKniha = (e) => {
        router.push("/kniha");
    }

    const [selectedKniznica, setselectedKniznica] = useState(1);

    return (
        <div className={styles.div}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.h2}>VYPLŇTE ÚDAJE O KNIHE:</h2>
                <labe className={styles.labe}>Knižnica</labe>
                <p>
                <Listbox value={selectedKniznica} onChange={setselectedKniznica} >
                        <Listbox.Button className={styles.Button}>{kniznice[selectedKniznica-1]?.nazov}</Listbox.Button>
                        <Listbox.Options  >
                            {kniznice.map((kniznica) => (
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
                <labe className={styles.labe} >Názov:</labe>
                <p><input className={styles.input} type="text" name="nazov" value={nazov} placeholder="Názov" onChange={(e) => setNazov(e.target.value)} ></input></p>
                <labe className={styles.labe} >Autor:</labe>
                <p><input className={styles.input} type="text" name="autor" value={autor} placeholder="Autor" onChange={(e) => setAutor(e.target.value)}></input></p>
                <labe className={styles.labe} >Žáner:</labe>
                <p><input className={styles.input} type="text" name="zaner" value={zaner} placeholder="zaner" onChange={(e) => setzaner(e.target.value)} ></input></p>
                <labe className={styles.labe} >Popis:</labe>
                <p><input className={styles.input} type="text" name="Popis" value={popis} placeholder="Popis" onChange={(e) => setPopis(e.target.value)} ></input></p>
                <button className={styles.button} onClick={zrusitKniha}>Zrušiť</button>
                <button className={styles.button1}>Potvrdiť</button>
            </form>
        </div>
    )
}

export default KnihaNew;