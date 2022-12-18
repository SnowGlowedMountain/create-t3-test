import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { Formik, Form, Field } from "formik";
import { useState } from 'react';
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const profileSubmit = trpc.public.updateOrAddProfile.useMutation();
  const profiles = trpc.public.getProfile.useQuery();

  return (
    <>
      <Head>
        <title>Test T3 App</title>
        <meta name="description" content="My test T3 app." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Formik
          initialValues={{name: "", aboutme: "", avatar: ""}}
          onSubmit={(values) => {
            profileSubmit.mutate(values);
           }}
        >
          {() => (
            <Form>
              <div className="py-4 block">
                <label className="text-white mr-3" htmlFor="name">Name</label>
                <Field
                  type="text"
                  name="name" />
              </div>

              <div className="py-4 block">
                <label className="text-white mr-3" htmlFor="aboutme">About Me</label>
                <Field
                  type="text"
                  name="aboutme"
                  component="textarea"
                  rows="5"
                  cols="15" />
              </div>

              <div className="py-4 block">
                <label className="text-white mr-3" htmlFor="aboutme">Avatar</label>
                <Field
                  type="file"
                  name="avatar"
                  className="text-white" />
              </div>

              <div className="py-4 block">
                <button
                  type="submit"
                  name="Submit"
                  className="text-white"
                >Update Me!</button>
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
};

export default Home;