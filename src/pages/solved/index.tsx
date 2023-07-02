import { useEffect, useState } from "react";
import { escape_text, login, login_logout, setup_load, setup_variables } from "../../../functions/baseFunc";
import { load_puzzles } from "../../../functions/listPuzzles";
import Link from "next/link";

export default function Solved(){
    const [loaded, setLoaded] = useState(false);
  const [final, setFinal] = useState<Array<any>>([]);
  const [user, setUser] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(()=>{
    setup_load(true)
    setup_variables(setUser)
    load_puzzles(true,setLoaded, setFinal)
    //loadUser()
  },[])
    return(
        <>
            <title>Treasure Hunt</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="res/bootstrap.min.css" />
            <link rel="stylesheet" href="res/styles.css" />
            <div className="parchment container inner_container" />
            {/* nav */}
            <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                <div className="container-fluid">
                <Link className="navbar-brand" href="#">
                    TreasureHunt
                    <span
                    className="badge rounded-pill bg-info"
                    style={{
                        fontSize: "12pt",
                        backgroundColor: "rgba(var(--bs-info-rgb), 0.7) !important"
                    }}
                    >
                    Beta
                    </span>
                </Link>
                <button className={`navbar-toggler ${isCollapsed ? 'collapsed' : ''}`} type="button" onClick={toggleNavbar}>
                    <span className="navbar-toggler-icon" />
                    </button>
                    <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`}>
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" href="/top">
                        Unsolved Treasure Hunts
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                        className="nav-link active"
                        aria-current="page"
                        href="/solved"
                        >
                        Solved Hunts
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                        className="nav-link"
                        aria-current="page"
                        href="https://www.treasurehunttoken.com"
                        >
                        How do these work?
                        </Link>
                    </li>
                    <span style={{ visibility: "hidden" }}>--</span>
                    <Link
                        type="button"
                        className="btn btn-outline-success"
                        href="/create"
                    >
                        Create Hunt
                    </Link>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <select
                        className="form-select"
                        style={{ backgroundColor: "rgb(20, 20, 20)", color: "white" }}
                        id="currencySelect"
                    >
                        <option value="BNB">BNB</option>
                        <option value="USD">USD</option>
                    </select>
                    </ul>
                    <ul
                    className="navbar-nav ms-auto mb-2 mb-lg-0"
                    style={{ marginLeft: "10pt !important" }}
                    >
                    <Link href="#" onClick={login_logout}>
                        <li className="nav-item">
                        <span
                            className="badge rounded-pill custom-primary text-light"
                            style={{ fontSize: "14pt", border: "2px solid white" }}
                        >
                            <span id="user_addr">Log in</span>
                            {/*<span style="visibility: hidden;">.</span>
                                            <img src="https://via.placeholder.com/150" style="height: 16pt; width: 16pt; margin-bottom: 1pt;" />*/}
                        </span>
                        </li>
                    </Link>
                    </ul>
                </div>
                </div>
            </nav>
            {/* nav */}
            <div
                className="container inner_container"
                style={{ paddingTop: "12pt" }}
                id="loginContainer"
            >
                {user ? <></> :<form className="row g-2" id="formMustLogin" action="">
                <button onClick={login} className="btn btn-primary custom-primary mb-3">
                    Must be logged in to solve treasure hunts. Android/IOS users will need
                    to access via the MetaMask Browser.
                </button>
                </form>}
            </div>
            <div
                className="container inner_container"
                style={{ paddingTop: "12pt" }}
                id="puzzleContainer"
            >
                <h2 style={{ paddingBottom: "10pt" }}>
                <b>Solved Hunts</b>
                </h2>
                {loaded && final.length != 0 ? <></>:<span id="noPuzzles">
                Please wait a few moments for solved hunts to load
                </span>}
                <div
                className="row row-cols-sm-1 row-cols-md-3 row-cols-lg-4 g-4"
                id="puzzleDiv"
                >
                    {loaded && final.length != 0? final.map((item:any)=> {
                        return (
                        (item.reward = escape_text(item.reward)),
                        (item.token_id = "" + parseInt(item.token_id)),
                        item.image != null && item.image.startsWith("https://ipfs.moralis.io") ? (
                            <div className="col" key={item.token_id}>
                                <div className="card grow clickable card-semiclear" onClick={() => window.location.href = `puzzle/${item.token_id}`}>
                                    <img src={item.image} style={{ width: '100%', aspectRatio: '1.5', objectFit: 'contain' }} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ fontWeight: 'bold' }}>{item.puzzle_title}</h5>
                                        {item.l && (
                                            <p className="card-text">
                                                Initial Reward: {item.reward}<br />
                                                {item.s && <span style={{ color: 'rgb(180, 0, 0)', fontWeight: 'bold' }}>(Unlisted)</span>}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null
                    );
                    }): <></>}
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            <svg style={{ position: "absolute", top: "-500px", left: 0, zIndex: -999 }}>
                <filter id="svg_paper">
                <feTurbulence x={0} y={0} baseFrequency="0.02" numOctaves={5} seed={1} />
                <feDisplacementMap in="SourceGraphic" scale={20} />
                </filter>
            </svg>
        </>
    );
}