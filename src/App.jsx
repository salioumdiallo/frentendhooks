import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Editarticle from "./components/articles/Editarticle";
import Insertarticle from "./components/articles/Insertarticle";
import Listarticles from "./components/articles/Listarticle";
import Editcategorie from "./components/categories/Editcategorie";
import Insertcategorie from "./components/categories/Insertcategorie";
import Listcategories from "./components/categories/Listcategorie";
import Editscategorie from "./components/scategories/Editscategorie";
import Insertscategorie from "./components/scategories/Insertscategorie";
import Listscategories from "./components/scategories/Listscategorie";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./components/Menu";
import "@fortawesome/fontawesome-free/css/all.css";


function App() {

  return (
    <>
      <Router>
<Menu />
<Routes>
    <Route path="/articles" exact element={<Listarticles/>}/>
    <Route path="/articles/add" element={<Insertarticle/>}/> 
    <Route path="/article/edit/:id" element={<Editarticle/>}/>

    <Route path="/categories" exact element={<Listcategories/>}/>
    <Route path="/categories/add" element={<Insertcategorie/>}/>
     <Route path="/categories/edit/:id" element={<Editcategorie/>}/>

    <Route path="/scategories" exact element={<Listscategories/>}/>
     <Route path="/scategories/add" element={<Insertscategorie/>}/> 
     <Route path="/scategories/edit/:id" element={<Editscategorie/>}/> 
</Routes>
</Router>
    </>
  )
}

export default App