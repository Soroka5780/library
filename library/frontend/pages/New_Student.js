import { useRouter } from "next/router";
import styles from '../styles/New_student.module.css';
import React, { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import axios from "axios";

const StudentNew = () => {
    const router = useRouter();
    const [meno, setMeno] = useState('a');
    const [priezvisko, setPriezvisko] = useState('a');
    const [ulica, setUlica] = useState('a');
    const [mesto, setMesto] = useState('a');
    const [email, setEmail] = useState('a');
    const [kontakt, setKontakt] = useState('a');
    const [kniznice, setKniznice] = useState([]);


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
            "meno": `${meno}`,
            "priezvisko": `${priezvisko}`,
            "ulica": `${ulica}`,
            "mesto": `${mesto}`,
            "email": `${email}`,
            "kontakt": `${kontakt}`,
        };

        axios.post('http://localhost:3000/student/', data).then(alert('Novy student bol uspesne ulozeny.'));
        router.push("/student");
    }

    const zrusitStudent = (e) => {
        router.push("/student");
    }


    const [selectedKniznica, setselectedKniznica] = useState(1);

    return (
        <div className={styles.div}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.h2}>VYPLŇTE ÚDAJE ŠTUDENTA:</h2>
                <label className={styles.label}>Kniznica</label>
                <p>
                    <Listbox value={selectedKniznica} onChange={setselectedKniznica} >
                        <Listbox.Button className={styles.Button}>{kniznice[selectedKniznica-1]?.nazov}</Listbox.Button>
                        <Listbox.Options>
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
                <label className={styles.labe}>Meno</label>
                <p><input className={styles.input} type="text" name="meno" placeholder="Meno" onChange={(e) => setMeno(e.target.value)}   ></input></p>
                <label className={styles.labe}>Priezvisko</label>
                <p><input className={styles.input} type="text" name="priezvisko" placeholder="Priezvisko" onChange={(e) => setPriezvisko(e.target.value)} ></input></p>
                <label className={styles.labe}>Ulica</label>
                <p><input className={styles.input} type="text" name="ulica" placeholder="Ulica" onChange={(e) => setUlica(e.target.value)} ></input></p>
                <label className={styles.labe}>Mesto</label>
                <p><input className={styles.input} type="text" name="mesto" placeholder="Mesto" onChange={(e) => setMesto(e.target.value)} ></input></p>
                <label className={styles.labe}>E-mail</label>
                <p><input className={styles.input} type="text" name="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} ></input></p>
                <label className={styles.labe}>Kontakt</label>
                <p><input className={styles.input} type="text" name="kontakt" placeholder="Kontakt" onChange={(e) => setKontakt(e.target.value)} ></input></p>
                <button className={styles.button} onClick={zrusitStudent} >Zrušiť</button>
                <button className={styles.button1}>Potvrdiť</button>
            </form>
            \
        </div>
    );
}

export default StudentNew;