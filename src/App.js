import { Routes, Route } from "react-router-dom";
import { Home, Signup, Login, Dashboard, Users, Meals, Stats } from './pages';
import { MainContainer, MealCard } from './components';
import RedirectLoggedInUser from './helpers/RedirectLoggedInUser';
import RequiresAuth from './helpers/RequiresAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <RedirectLoggedInUser>
          <Home />
        </RedirectLoggedInUser> 
      } />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route element={<RequiresAuth />}>
        <Route path="/dashboard" element={
          <MainContainer>
            <Dashboard /> 
          </MainContainer>
        } />
        <Route path="/meal/:id" element={
          <MainContainer>
            <MealCard /> 
          </MainContainer>
        } />
        <Route path="/users" element={ 
          <MainContainer>
            <Users />
          </MainContainer>
        } />
        <Route path="/meals" element={ 
          <MainContainer>
            <Meals /> 
          </MainContainer>
        } />
        <Route path="/stats" element={ 
          <MainContainer>
            <Stats /> 
          </MainContainer>
        } />
      </Route>
    </Routes>
  );
}

export default App;
