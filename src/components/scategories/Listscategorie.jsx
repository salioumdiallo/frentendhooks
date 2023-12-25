import React from 'react'
import { useEffect, useState } from 'react'
import { fetchscategories, deletescategorie } from "../../services/scategorieservice"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Affichescategorietabel from './Affichescategorietabel';


const Listscategorie = () => {
    const [scategories, setScategories] = useState([])
    useEffect(() => {
        listscategories()
    }, [])
    const listscategories = async () => {
        try {
            await fetchscategories().then(res => setScategories(res.data))
        }
        catch (error) {
            console.log(error)
        }
    }
    const addscategorie = (newscategorie) => {
        setScategories([newscategorie, ...scategories])
    }
    const deleteScategorie = (scategorieId, ref) => {
        confirmAlert({
            title: "Confirm delete...",
            message: " supprimer la scategorie: " + ref,
            buttons: [
                {


                    label: 'Oui',
                    onClick: () => deletescategorie(scategorieId)
                        .then(res =>
                            setScategories(scategories.filter((scategorie) => scategorie._id !==

                                scategorieId)))

                        //.then(console.log("suppression effectuée avec success"))
                        .catch(error => console.log(error))
                },
                {
                    label: 'Non',
                }
            ]
        });

    }

    const updateScategorie = (scatmod) => {
        setScategories(scategories.map((scategorie) => scategorie._id === scatmod._id ? scatmod :
            scategorie));
    };
    return (
        <div>
            <Affichescategorietabel scategories={scategories} deleteScategorie={deleteScategorie} />
        </div>
    )
}

export default Listscategorie
