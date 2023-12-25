import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview)
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from "react";
import { fetchscategories } from "../../services/scategorieservice"
const Insertarticle = ({ addproduct }) => {
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [article, setArticle] = useState({})
  const [scategories, setScategories] = useState([])
  const [validated, setValidated] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    getscategories()
  }, [])


  const getscategories = async () => {
    try {
      await fetchscategories().then(res =>
        setScategories(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  const onInputChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });

  };


  const handelesubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      addproduct(article);
      //vider le form
      handleReset()
      setValidated(false);
    }
    setValidated(true);
  }
  const handleReset = () => {
    setArticle({})
    handleClose()
  }
  const serverOptions = () => {
    console.log('server pond');
    return {

      process: (fieldName, file, metadata, load, error, progress, abort)=> {

        console.log(file)
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Ecommerce');
        data.append('cloud_name', 'dud6s4pg2');
        data.append('public_id', file.name);

        axios.post('https://api.cloudinary.com/v1_1/dud6s4pg2/upload', data)

          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setArticle({ ...article, imageart: data.url });
            load(data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            error('Upload failed');
            abort();
          });
      }
    };
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Nouveau
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout article</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="container w-100 d-flex justify-content-center">

            <div>
              <div className='form mt-3'>
                <Form className="border p-3"  >
                  <Row className="mb-2">
                    <Form.Group as={Col} md="6" >
                      <Form.Label >Référence *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Référence"
                        value={article.reference}
                        name='reference'
                        onChange={(e) => onInputChange(e)}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Désignation *</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Désignation"
                        value={article.designation}
                        name='designation'
                        onChange={(e) => onInputChange(e)}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-2">
                    <Form.Group className="col-md-6">
                      <Form.Label>Marque *</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Marque"
                        value={article.marque}
                        name='marque'
                        onChange={(e) => onInputChange(e)}
                      />

                    </Form.Group>
                    <Form.Group as={Col} md="6">
                      <Form.Label>Prix</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Prix"
                        value={article.prix}
                        name='prix'
                        onChange={(e) => onInputChange(e)}
                      />

                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group className="col-md-6 ">
                      <Form.Label>
                        Qté stock<span className="req-tag">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        value={article.qtestock}
                        name='qtestock'
                        onChange={(e) => onInputChange(e)}
                        placeholder="Qté stock"
                      />

                    </Form.Group>

                    <Form.Group as={Col} md="12">
                      <Form.Label>Catégorie</Form.Label>
                      <Form.Control
                        as="select"
                        type="select"
                        value={article.scategorieID}
                        name='scategorieID'
                        onChange={(e) => onInputChange(e)}
                      >
                        <option> choisir une Scategorie</option>
                        {scategories.map((scat, index) =>
                          <option key={index} value={scat._id}>{scat.nomscategorie}</option>
                        )}


                      </Form.Control>
                    </Form.Group>

                  </Row>
                  <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                    <FilePond

                      files={files}
                      acceptedFileTypes="image/*"
                      onupdatefiles={setFiles}
                      allowMultiple={false}
                      server={serverOptions()}
                      name="file"

                    />
                  </div>

                  {/* <Link className="btn btn-outline-danger mx-2" to="/articles">
        Cancel
        </Link> */}
                </Form>
              </div>
            </div>
          </div>




        </Modal.Body>
        <Modal.Footer>
          <td><Button variant="warning" onClick={(e) => handelesubmit(e)} >submit <i className="fa-regular fa-floppy-disk"></i></Button></td>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Insertarticle