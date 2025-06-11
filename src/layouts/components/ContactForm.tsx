"use client";

import { Formik, Form } from "formik";
import { useState } from "react";

const ContactForm = () => {

  const contact_form_action = "https://form-handler-production.up.railway.app/submit-form"
  type StatusType = "success" | "error" | null;
  const [status, setStatus] = useState<StatusType>(null);

  return (
    <>
      <div className="container pt-10 pb-10">
        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          onSubmit={async (values, { resetForm }) => {
            setStatus(null);

            try {
              const response = await fetch(contact_form_action, {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(values).toString(),
              });


              if (response.ok) {
                setStatus("success");
                resetForm();
              } else {
                setStatus("error");
              }
            } catch (err) {
              console.error(err);
              setStatus("error");
            }
          }}
        >
          {({ handleChange, values }) => (
            <Form className="max-w-sm mx-auto">
              <div className="mb-5">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  className="form-input"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  className="form-input"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  value={values.message}
                  className="form-input"
                  placeholder="Your message"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>

              <div className="h-16 w-full flex items-center justify-center overflow-hidden">

                {status === "success" && (
                  <p className="mt-4 font-bold text-xl ">Message sent successfully!</p>
                )}

                {status === "error" && (
                  <p className="mt-4 text-red-500">Something went wrong. Please try again.</p>
                )}
              </div>

            </Form>
          )}
        </Formik>
        </div>

    </>
  );
};

export default ContactForm;
