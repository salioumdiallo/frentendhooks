import React from 'react'
import { useEffect, useState } from 'react'
import { fetchcategories, deletecategorie } from "../../services/categorieservice"
import Affichecategorietabel from './Affichecategorietabel'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const Listcategorie = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        listcategories()
    }, [])
    const listcategories = async () => {
        try {
            await fetchcategories().then(res => setCategories(res.data))
        }
        catch (error) {
            console.log(error)
        }
    }
    const addcategorie = (newcategorie) => {
        setCategories([newcategorie, ...categories])
    }
    const deleteCategorie = (categorieId, cat) => {
        confirmAlert({
            title: "Confirm delete...",
            message: " supprimer la categorie: " + cat,
            buttons: [
                {


                    label: 'Oui',
                    onClick: () => deletecategorie(categorieId)
                        .then(res =>
                            setCategories(categories.filter((categorie) => categorie._id !==

                                categorieId)))

                        //.then(console.log("suppression effectuée avec success"))
                        .catch(error => console.log(error))
                },
                {
                    label: 'Non',
                }
            ]
        });

    }

    const updateCategorie = (catmod) => {
        setCategories(categories.map((categorie) => categorie._id === catmod._id ? catmod :
            categorie));
    };
    return (
        <div>
            <Affichecategorietabel categories={categories} deleteCategorie={deleteCategorie} />
        </div>
    )
}

export default Listcategorie
