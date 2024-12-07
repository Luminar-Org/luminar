import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { AppKitProvider } from "./lib/AppKitProvider";
import Trade from "./pages/Trade";

function App() {
  return (
    <main className="bg-[#0f1322] min-h-screen w-full">
      <AppKitProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trade/:symbol" element={<Trade />} />
          </Routes>
        </BrowserRouter>
      </AppKitProvider>
    </main>
  );
}

export default App;
