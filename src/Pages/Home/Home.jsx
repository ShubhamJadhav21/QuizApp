import React from "react";
import style from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={style.main_container}>
      <div className={style.wrapper}>
        <h1 className={style.heading}>Quiz</h1>

        <nav>
          <Link to="/startquiz" className={style.link}>Student</Link>
        </nav>

        <nav>
          
          <Link to="/admin"  className={style.link}>Admin</Link>
        </nav>
      </div>
    </div>
  );
}
