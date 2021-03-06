import React, { useContext } from 'react'
import { Field, Form, Formik } from 'formik'

import { credentials } from '../xstate/node/credentials'
import { MachineContext } from '../xstate/machine.context'
import { MachineEvents } from '../xstate/machine.types'

export default function Credentials() {
  const machine = useContext(MachineContext)

  return (
    <main>
      <h1>PoC xState oBoarding</h1>

      Enter your basic information

      <Formik
        initialValues={credentials}
        onSubmit={(values, { setSubmitting }) => {
          machine.send({ type: MachineEvents.CONTINUE, data: values })
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Name</label><br />
            <Field type="text" name="name" /><br /><br />

            <label>Surname</label><br />
            <Field type="text" name="surname" /><br /><br />

            <label>Age</label><br />
            <Field type="number" name="age" /><br /><br />

            <label>Email</label><br />
            <Field type="email" name="email" /><br /><br />

            <label>Gender</label><br />
            Male <Field type="radio" name="gender" value='MALE' /> Female <Field type="radio" name="gender" value='FEMALE' /><br /><br />

            <button type="submit" disabled={isSubmitting}>
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </main>
  )
}
