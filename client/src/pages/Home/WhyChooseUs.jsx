import React from "react";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
    return (
        <section className="why-choose-us">

            <div className="why-header">
                <p className="why-eyebrow">
                    WHY Car Inventory
                </p>

                <h2>
                    Why Choose Us?
                </h2>

                <p className="why-description">
                    With decades of experience and a focus on quality,
                    we make finding your next pre-owned luxury car simple.
                </p>
            </div>


            <div className="why-cards">

                <div className="why-card">

                    <strong>
                        30+
                    </strong>

                    <h3>
                        Years of Experience
                    </h3>

                    <p>
                        Over three decades of experience in the
                        pre-owned automobile industry.
                    </p>

                </div>


                <div className="why-card">

                    <strong>
                        50+
                    </strong>

                    <h3>
                        Vehicles in Stock
                    </h3>

                    <p>
                        A wide selection of quality pre-owned
                        vehicles across different segments.
                    </p>

                </div>


                <div className="why-card">

                    <strong>
                        Quality
                    </strong>

                    <h3>
                        Pre-Owned Vehicles
                    </h3>

                    <p>
                        Specializing in nearly-new, less-driven
                        and quality luxury vehicles.
                    </p>

                </div>


                <div className="why-card">

                    <strong>
                        NCR
                    </strong>

                    <h3>
                        Delhi NCR
                    </h3>

                    <p>
                        Serving customers across Delhi NCR
                        for more than three decades.
                    </p>

                </div>

            </div>

        </section>
    );
};

export default WhyChooseUs;