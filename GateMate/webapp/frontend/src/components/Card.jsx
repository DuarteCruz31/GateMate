import React from "react";
import img_plane from "../assets/card/img_plane.png";
import arrow from "../assets/card/img_arrowright_black_900.svg";

function Card() {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h1 className="card-title">LIS - FRA</h1>
                <h2>TP574</h2>
                <div className="card-actions justify-end">
                    <button className="arrow">
                        <img className="arrow-icon" src={arrow} alt="arrowright" />
                    </button>
                </div>
                <div className="flex items-center">
                    <img className="plane-icon w-4 h-4 mr-2" src={img_plane} alt="plane" />
                    <div className="airline">TAP Air Portugal</div>
                </div>
            </div>
        </div>
        
    );
}

export default Card;