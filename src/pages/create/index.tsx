import { useEffect, useState } from "react";
import { login, login_logout, setup_variables } from "../../../functions/baseFunc";
import { create_puzzle, initFunction } from "../../../functions/create";
import Link from "next/link";
// import { useMoralisWeb3Api } from "react-moralis";
export default function Create(){
    const [user, setUser] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    // const Web3Api = useMoralisWeb3Api();
    // const fetchNFTsForContract = async () => {
    //     const polygonNFTs = await Web3Api.account.getNFTsForContract({
    //         chain: "polygon",
    //         address: "0x75e3e9c92162e62000425c98769965a76c2e387a",
    //         token_address: "0x2953399124F0cBB46d2CbACD8A89cF0599974963",
    //     });
    //     console.log(polygonNFTs);
    // };
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };
    useEffect(()=>{
        setup_variables(setUser)
        initFunction()
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
            <span className="badge rounded-pill bg-info" style={{ fontSize: "12pt", backgroundColor: "rgba(var(--bs-info-rgb), 0.7) !important" }}>
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
                <Link className="nav-link" aria-current="page" href="/solved">
                    Solved Hunts
                </Link>
                </li>
                <span style={{ visibility: "hidden" }}>--</span>
                <Link className="btn btn-outline-success" href="/create">
                Create Hunt
                </Link>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <select className="form-select" style={{ backgroundColor: "rgb(20, 20, 20)", color: "white" }} id="currencySelect">
                <option value="BNB">BNB</option>
                <option value="USD">USD</option>
                </select>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ marginLeft: "10pt !important" }}>
                <Link href="#" onClick={login_logout} className="nav-link">
                <span className="badge rounded-pill custom-primary text-light" style={{ fontSize: "14pt", border: "2px solid white" }}>
                    <span id="user_addr">Log in</span>
                </span>
                </Link>
            </ul>
            </div>
        </div>
        </nav>
        {/* nav */}
        <div className="container inner_container" style={{ paddingTop: "12pt" }}>
            <h2 style={{ paddingBottom: "10pt" }}>
            <b>Create a Hunt</b>
            </h2>
            <form
            className="row g-2"
            id="formMustLogin"
            style={{ display: "none" }}
            action="javascript:void(0);"
            >
            <Link href="#" onClick={login} className="btn btn-primary custom-primary mb-3">
                Must be logged in to create a hunt
            </Link>
            </form>
            <form
            id="formCreatePuzzle"
            className="form-semiclear"
            action="javascript:void(0);"
            >
            <div className="mb-3">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                Hunt Title (max 60 characters)
                </label>
                <input className="form-control" type="text" id="title" />
            </div>
            <div className="mb-3">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                Hunt Art for preview and NFT (recommended resolution 600x400)
                </label>
                <input className="form-control" type="file" id="puzzleArt" />
            </div>
            <div className="mb-3">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                Hunt Text
                </label>
                <textarea
                    className="form-control"
                    inputMode="text"
                    id="desc"
                    rows={4}
                    defaultValue={""}
                />
            </div>
            <div className="mb-3">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                Hunt Graphic (this can be part of the actual hunt)
                </label>
                <input className="form-control" type="file" id="puzzleGraphic" />
            </div>
            <div className="mb-3">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                Hunt Solution (case-sensitive)
                </label>
                <input className="form-control" type="text" id="soln" />
            </div>
            <div className="mb-3">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                Hunt Creator (40 char max)
                </label>
                <input className="form-control" type="text" id="creator" />
            </div>
            <div className="mb-3">
            <label className="form-label" style={{ fontWeight: "bold" }}>
                Hunt&apos;s Treasure (BNB)
            </label>
            <input className="form-control" type="text" id="puzzleReward" />
            </div>
            <div className="mb-3">
                <label className="form-label">
                <span style={{ fontWeight: "bold" }}>Hunt Visibility</span>
                (Note: hunts will always be visible when logged in as the hunt
                creator)
                </label>
                <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="puzzleVisibility"
                    defaultValue="public"
                    defaultChecked={true}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Public (visible on &quot;Unsolved Treasure Hunts&quot; page)
                </label>
                </div>
                <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="puzzleVisibility"
                    defaultValue="unlisted"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Unlisted (can be shared using the link)
                </label>
                </div>
            </div>
            <br />
            <Link href="#" onClick={create_puzzle} className="btn btn-primary mb-3">
                Create Hunt
            </Link>
            <br />
            <br />
            <br />
            <br />
            </form>
            <p id="sectionProgress" style={{ display: "none" }}></p>
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