import chalk from 'chalk'

/* Function to handle Fatal Error in the server */
const handleFatalError = (error) => {
  console.error(chalk`{red.bold [fatal error] ${error.message}❌ WTF O__O }`)
  console.error(error.stack)
  process.exit(1)
}

/* Function to send a specific responses
* Parameters:
* 1) res: The response
* 2) object: The object of database. Default null
    model: string of model. Example ('User'),
    data: object of database
* 3) status: The status of response. Default status 200 OK
*/
const handleResponseSuccess = (res, object = { data: null, model: null }, status =  200) => {

  console.log(chalk`{green.bold The response has be send successfully! :) }`)

  let response = {
    message: 'Success',
    status: 1,
  }

  if (object.data === null) {
    res.status(status).send(response)
  } else {
    response[object.model] = object.data
    res.status(status).send(response)
  }

}

/* Function to send a error in the response */
const handleResponseError = (error = {}, res) => {

  console.error(chalk`{red.bold WTF!! An error ocurred in the response! O__O }`)
  console.error(error)
  
  if (error.stack)
    console.error(error.stack)

  res.status(error.status || 500).send({
    message: 'An error ocurred  ❌',
    error
  })
}

export {
  handleResponseSuccess as Success,
  handleResponseError as Error,
  handleFatalError
}
