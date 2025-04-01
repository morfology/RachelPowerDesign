"use client";
//import config from "@/config/config.json";
//import { getListPage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
//import SeoMeta from "@/partials/SeoMeta";
//import { RegularPage } from "@/types";
//import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";

const Contact = () => {
  //const data: RegularPage = getListPage("contact/_index.md");
  // const { frontmatter } = data;
  // const { title, description, meta_title, image } = frontmatter;
  // const { contact_form_action } = config.params;

  const contact_form_action = 'https://form-handler-production.up.railway.app/submit-form'

  return (
    <>
      {/* <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      /> */}
      <PageHeader title={'Contact Us'} />

      <Formik
        initialValues={{ name: "", email: "m@xx.com", message: "" }}
        onSubmit={async (values) => {

          console.log('submit')

          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));


          try {
            const response = await fetch(contact_form_action, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams(values).toString(),
            });

            console.log(response)

          } catch (err) {
            console.error(err);
          }
        }}
      >

        {({
          handleChange,
          values,
          // touched,
          // errors,
          // handleBlur,
          // handleSubmit,
          // isSubmitting,
        }) => (

          <Form className="max-w-sm mx-auto" action="/action_page.php">

            <div className="mb-5">
              <label className="form-label" htmlFor="grid-first-nam">Name</label>
              <input type="text" id="name"
                onChange={handleChange}
                value={values.name}
                className="form-input"
                placeholder="Your name" required />
            </div>

            <div className="mb-5">
              <label className="form-label" htmlFor="grid-first-name">Email</label>
              <input type="email" id="email"
                onChange={handleChange}
                value={values.email}
                className="form-input"
                placeholder="name@company.com" required />
            </div>

            <div className="mb-5">
              <label className="form-label" htmlFor="grid-first-name">Message</label>
              <textarea id="message"
                onChange={handleChange}
                value={values.message}
                className="form-input"
                placeholder="Your message" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </Form>

        )}
      </Formik>
    </>
  );
};

export default Contact;
