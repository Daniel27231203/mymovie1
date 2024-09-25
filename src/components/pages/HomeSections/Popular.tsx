import scss from "./Popular.module.scss"
import React from 'react';

const Popular = () => {
    return (
        <section className={scss.Popular}>
            <div className="container">
                <div className={scss.content}>
                    popular
                </div>
            </div>
        </section>
    );
};

export default Popular;