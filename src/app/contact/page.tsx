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
        initialValues={{ name: "", email: "m@xx.com" }}
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
                className="appearance-none block w-full py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                placeholder="Your name" required />
            </div>

            <div className="mb-5">
              <label className="form-label" htmlFor="grid-first-name">Email</label>
              <input type="email" id="email" 
                onChange={handleChange}
                value={values.email}
                className="appearance-none block w-full py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                placeholder="name@company.com" required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </Form>

        )}
      </Formik>


      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">


              <div className="App">
                <h1>Contact Us</h1>
                <Formik
                  initialValues={{ name: "", email: "" }}
                  onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    alert(JSON.stringify(values, null, 2));
                  }}
                >
                  <Form>

                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                      First Name
                    </label>
                    <Field name="name" type="text" />

                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        First Name
                      </label>
                      <Field name="name" type="text" />
                    </div>



                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Last Name
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                    </div>


                    <Field name="email" type="email" />
                    <button type="submit" className="btn btn-primary">Submit</button>







                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
