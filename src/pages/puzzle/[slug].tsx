import { useEffect, useState } from "react";
import { login, login_logout, setup_variables } from "../../../functions/baseFunc";
import {attempt_solve, initFunctionPuzzle, load_puzzle, show_sponsors_table, sponsor} from "../../../functions/eachPuzzle"
import Link from "next/link";
import Moralis from "moralis-v1";
import { useRouter } from "next/router";

export default function Puzzle(){
    const [user, setUser] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const router = useRouter();
    const { slug } = router.query;
    const toggleNavbar = () => {
      setIsCollapsed(!isCollapsed);
    };
    useEffect(()=>{
        setup_variables(setUser);
        const checkSlug = async () => {
          while (!slug) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 1 second
          }
          // slug is now available, call load_puzzle
          load_puzzle(slug);
        };
        
        checkSlug();
    })
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
                    <Link className="nav-link" aria-current="page" href="/solved">
                    Solved Hunts
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
                    <option value="USD">USD</option>
                    <option value="BNB">BNB</option>
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
        <div className="container inner_container" style={{ paddingTop: "12pt" }}>
            <h2 style={{ paddingBottom: "3pt" }}>
            <b id="puzzleTitle" />
            </h2>
            <h5 style={{ paddingBottom: "10pt" }}>
            <span id="puzzleSubtitle" />
            </h5>
            <div className="row" id="spinnerSection">
            <div className="d-flex justify-content-center">
                <div
                className="spinner-border text-success"
                style={{ width: "2rem", height: "2rem" }}
                role="status"
                />
            </div>
            </div>
            <div className="row" id="puzzleSection" style={{ display: "none" }}>
            <div className="col-md-3">
                <img id="puzzleArt" src="#" style={{ width: "90%", height: 0 }} />
                <br />
                <br />
                <p style={{ fontSize: "15pt" }} id="rewardWrap">
                Treasure:{" "}
                <b>
                    <span id="puzzleReward" />
                </b>
                </p>
                <Link id="rewardLink" href="#" target="_blank">
                See treasure on block explorer
                <br />
                <br />
                </Link>
                <p
                id="alreadySolved"
                style={{ display: "none", color: "rgb(220, 0, 0)" }}
                >
                <b>
                    This hunt has already been solved. You may still enter a solution to
                    check it, but there is no treasure.
                </b>
                </p>
                <p id="solvedBy" style={{ display: "none" }} />
                <Link id="historyLink" href="#" onClick={show_sponsors_table}>
                    See hunt history
                </Link>
                <br />
                <br />
                <button onClick={sponsor} id="sponsor" className="btn btn-success">
                Sponsor this hunt
                </button>
                <br />
                <br />
                <br />
            </div>
            <div className="col-md-9">
                <div id="successSection" style={{ display: "none" }}>
                <h3>
                    <b>Congratulations! You have solved the treasure hunt.</b>
                </h3>
                <p>Your treasure is being dispensed</p>
                <p id="dispenseReward" style={{ fontWeight: "bold" }}>
                    Please do not close this page
                </p>
                <p id="nftTransfer" style={{ display: "none" }}>
                    NFT transfer transaction hash: <Link href="#" id="nftHash" />
                </p>
                <p id="rewardTransfer" style={{ display: "none" }}>
                    Reward transfer transaction hash: <Link href="#" id="rewardHash" />
                </p>
                <br />
                </div>
                <div id="innerPuzzleSection">
                <p id="puzzleDesc" />
                <Link id="graphicLink" href="#" target="_blank">
                    <img
                    id="puzzleGraphic"
                    src="#"
                    style={{ width: "100%", height: 0 }}
                    />
                </Link>
                <br />
                <br />
                <p>
                    <b>Solve the hunt:</b>
                </p>
                {user
                ? 
                <form
                    className="row g-2 form-semiclear"
                    id="formSolve"
                >
                    <div className="col-8">
                    <input
                        type="text"
                        className="form-control"
                        id="solution_box"
                        placeholder="Solution"
                    />
                    </div>
                    <div className="col-4">
                    <button
                        onClick={attempt_solve}
                        type="button"
                        className="btn text-white custom-primary mb-3"
                    >
                        Submit
                    </button>
                    </div>
                </form>
                :
                <form
                    className="row g-2"
                    id="formMustLogin"
                >
                    <button onClick={login} className="btn text-white custom-primary mb-3" type="button">
                    Must be logged in to solve
                    </button>
                </form>
                }
                
                <br />
                <br />
                <br />
                </div>
            </div>
            </div>
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