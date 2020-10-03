import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateContacto } from "../api/fetch/contacto";
import { NavBar } from "../components/layout/navbar";
import { Contacto_INT, ResponseAxios } from "../interface";
import { Alert } from "reactstrap";

import { Footer } from "../components/layout/fotter";

interface Contacto {
  message: string;
  name: string;
  email: string;
  subject: string;
}

export function ContactoPage() {
  const [feedback, setFeedback] = useState<string>("");
  const [isFeedback, setIsFeedback] = useState<string>("");

  const { handleSubmit, register, errors } = useForm<Contacto>();

  const send = async (data: Contacto) => {
    setIsFeedback("");
    const { message, name, email, subject } = data;

    const obj: Contacto_INT = {
      mensaje: message,
      nombre: name,
      correo: email,
      tema: subject,
    };

    try {
      const resContact: ResponseAxios = await CreateContacto(obj);

      if (resContact.respuesta.type === "ERROR") {
        setIsFeedback("danger");
        setFeedback(resContact.respuesta.feeback);
      } else {
        setIsFeedback("success");
        setFeedback("Su mensaje fue enviado con exito");
      }
    } catch (error) {
      setIsFeedback("danger");
      setFeedback(error.message);
    }
  };

  return (
    <>
      <NavBar title="Contacto" />
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Contacto</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="contact-section section_padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Contacto</h2>
            </div>
            <div className="col-lg-8">
              <form
                onSubmit={handleSubmit(send)}
                className="form-contact contact_form"
                id="contactForm"
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        className="form-control w-100"
                        name="message"
                        id="message"
                        ref={register({ required: true })}
                        cols={30}
                        rows={9}
                        placeholder="Escribe tu Mensaje"
                      ></textarea>
                      {errors.message && <span>Este campo es obligatorio</span>}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="name"
                        ref={register({ required: true })}
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                      />
                      {errors.name && <span>Este campo es obligatorio</span>}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="email"
                        id="email"
                        ref={register({ required: true })}
                        type="email"
                        placeholder="Tu correo electronico"
                      />
                      {errors.email && <span>Este campo es obligatorio</span>}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        name="subject"
                        id="subject"
                        ref={register({ required: true })}
                        type="text"
                        placeholder="Sobre el tema"
                      />
                      {errors.subject && <span>Este campo es obligatorio</span>}
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="button button-contactForm btn_4 boxed-btn"
                  >
                    Enviar Mensaje
                  </button>
                </div>
                {isFeedback && <Alert color={isFeedback}>{feedback}</Alert>}
              </form>
            </div>
            <div className="col-lg-4">
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-home"></i>
                </span>
                <div className="media-body">
                  <h3>La Teresa.</h3>
                  <p>centro, CA 91770</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-tablet"></i>
                </span>
                <div className="media-body">
                  <h3>+593 9865 562</h3>
                  <p>Oficinas de 9am a 6pm</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-email"></i>
                </span>
                <div className="media-body">
                  <h3>support@la_teresa.com</h3>
                  <p>Envie cualquier pregunta!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
