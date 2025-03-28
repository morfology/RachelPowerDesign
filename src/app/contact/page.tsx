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

  const contact_form_action = 'a'

  return (
    <>
      {/* <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      /> */}
      <PageHeader title={'Contact Us'} />

{/* 
      <div>
        <h1>Anywhere in your app!</h1>
        <Formik
          initialValues={{ email: '1234', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div> */}


      <Formik
        initialValues={{ name: "", email: "m@xx.com", message: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
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

          <Form className="max-w-sm mx-auto">

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
