import React from 'react'
import { useEffect, useState } from 'react'
import { fetcharticles, deletearticle, addarticle,editarticle } from "../../services/articleservice"
import Affichearticletabel from './Affichearticlestabel'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Insertarticle from './Insertarticle';
import ReactLoading from 'react-loading';

const Listarticle = () => {
    const [products, setProducts] = useState([])
    const[isLoading,setIsloading]=useState(true)
    
    useEffect(() => {
        listproduits()
    }, [])
    const listproduits = async () => {
        try {
            await fetcharticles().then(res =>{ 
                setProducts(res.data)
            setIsloading(false)
        })
        }
        catch (error) {
            console.log(error)
        }
    }
    const addproduct = async (newproduit) => {
        await addarticle(newproduit).then(res => {
            setProducts([res.data, ...products])
        }
        )
    }
    const deleteProduct = (productId, ref) => {
        confirmAlert({
            title: "Confirm delete...",
            message: " supprimer l' article: " + ref,
            buttons: [
                {


                    label: 'Oui',
                    onClick: () => deletearticle(productId)
                        .then(res =>
                            setProducts(products.filter((product) => product._id !==

                                productId)))

                        //.then(console.log("suppression effectuée avec success"))
                        .catch(error => console.log(error))
                },
                {
                    label: 'Non',
                }
            ]
        });

    }

    const updateProduct = (prmod) => {
        editarticle(prmod).then(res=>{
        setProducts(products.map((product) => product._id === prmod._id ? prmod :
            product));
        })
    };
    if (isLoading) return <center><ReactLoading type='spokes' color='red' height={'8%'} width={'8%'}/></center>

    return (
        <div>
            <Insertarticle addproduct={addproduct} />
            <Affichearticletabel products={products} deleteProduct={deleteProduct} updateProduct={updateProduct} />
        </div>
    )
}

export default Listarticle
