import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layouts from './Layouts';
import { publicRoutes } from './routes';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Home page */}
                    {publicRoutes.map((route, index) => {
                        let Layout = Layouts;

                        // const PrivateRoute = ({ children }) => {
                        //     const token = localStorage.getItem('login');
                        //     return <>{token === null ? <Navigate to="/login" /> : children}</>;
                        // };

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
