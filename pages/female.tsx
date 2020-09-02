import React, { useContext } from 'react'
import { Field, Form, Formik } from 'formik'

import { MachineContext } from '../xstate/machine.context'
import { credentials } from '../xstate/node/credentials'
import { MachineEvents } from '../xstate/machine.types'

export default function Female() {
  const machine = useContext(MachineContext)

  return (
    <main>
      <h1>PoC xState oBoarding</h1>

      Form Female<br /><br />

      <Formik
        initialValues={credentials}
        onSubmit={(values, { setSubmitting }) => {
          machine.send({ type: MachineEvents.CONTINUE, data: values })
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Children?</label><br />
            <Field type="checkbox" name="hasChildren" /><br /><br />

            <label>Pregnant?</label><br />
            <Field type="checkbox" name="isPregnant" /><br /><br />

            <button type="submit" disabled={isSubmitting}>
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </main>
  )
}
