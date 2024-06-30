import React, {useState} from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import StarIcon from '../assets/icons/Estrella'

// Function to accept the contract
const acceptContract = async (IdContract, IdUser, IdWorker, IdContractor, workerTurn, onContractUpdate, setLoadingLink) => {
	setLoadingLink(true)
    const sendData = { IdContract, IdUser, IdWorker, IdContractor, workerTurn }
    await fetch('https://www.changas.site/api/contract-handlers/close-contract', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
    // Once the contract is accepted we call the callback function to update the contracts
		console.log('Alto bug')
    onContractUpdate()
    setLoadingLink(false)
  }
  
  // Function to reject the contract (delete it)
  const rejectContract = async (IdContract, IdUser, IdWorker, IdContractor, workerTurn, onContractUpdate, setLoadingLink) => {
    setLoadingLink(true)
    const query = `?workerTurn=${workerTurn}&IdUser=${IdUser}&IdWorker=${IdWorker}&IdContractor=${IdContractor}&IdContract=${IdContract}`
    await fetch(`https://www.changas.site/api/contract-handlers/reject-contract${query}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Once the contract is rejected we call the callback function to update the contracts
    onContractUpdate()
    setLoadingLink(false)
  }


function DealLink({ contract, IdUser, onContractUpdate, navigation }) {
  // This state is to disable the buttons
  const [loadingLink, setLoadingLink] = useState(false)

  const isWorker = IdUser === contract.id_worker
  const now = new Date().getTime()
  const contractDate = new Date(contract.date).getTime()

  const enableReview = now >= contractDate && contract.closed
  const isReviewed = contract.score !== undefined
  const isUserTurn = (contract.worker_turn && isWorker) || (!contract.worker_turn && !isWorker)
  const canReDeal = !contract.closed && now <= contractDate && isUserTurn
  const isExpired = now > contractDate && !contract.closed && isUserTurn

  const ShowReviewLink = () => (
    <TouchableOpacity style={styles.linkButton} disabled={loadingLink}>
      <Text style={styles.linkText}>Reseñar</Text>
    </TouchableOpacity>
  )

  if (enableReview) {
    if (isReviewed) {
      return (
        <View style={styles.reviewContainer}>
          <StarIcon height={20} width={20} />
          <Text style={styles.reviewText}>{contract.score}/5</Text>
        </View>
      )
    } else if (!isWorker) {
      return <ShowReviewLink />
    }
  } else if (canReDeal) {
    return (
      <View style={styles.optionsContainer}>
        <Text style={styles.optionsText}>Opciones:</Text>
        <View style={styles.buttonsContainer}>

          <TouchableOpacity style={styles.optionButton} disabled={loadingLink} 
          onPress={() => {navigation.navigate('Counterdeal', {IdUser: IdUser, IdContract: contract.id_contract, 
            workerTurn: contract.worker_turn, jobtitle: contract.title, category: contract.category,
            budget: contract.budget, description: contract.description, date: contract.date})}}>
            <Text style={styles.optionButtonText}>Contraofertar</Text>
          </TouchableOpacity>

          <Text style={styles.separator}>|</Text>

          <TouchableOpacity style={styles.optionButton} disabled={loadingLink} onPress={
            () => acceptContract(contract.id_contract, IdUser, contract.id_worker, 
            contract.id_contractor, contract.worker_turn, onContractUpdate, setLoadingLink)
            }>
            <Text style={styles.optionButtonText}>Aceptar</Text>
          </TouchableOpacity>

          <Text style={styles.separator}>|</Text>

          <TouchableOpacity style={styles.optionButton} disabled={loadingLink} onPress={
            () => rejectContract(contract.id_contract, IdUser, contract.id_worker, 
            contract.id_contractor, contract.worker_turn, onContractUpdate, setLoadingLink)
            }>
            <Text style={styles.optionButtonText}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  } else if (isExpired) {
    return (
      <View style={styles.expiredContainer}>
        <TouchableOpacity disabled={loadingLink} style={styles.expiredButton} onPress={
            () => rejectContract(contract.id_contract, IdUser, contract.id_worker, 
                contract.id_contractor, contract.worker_turn, onContractUpdate, setLoadingLink)}>
          <Text style={styles.expiredButtonText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  reviewText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginVertical: 8,
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginVertical: 8,
  },
  optionsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  optionButtonText: {
    fontSize: 16,
  },
  separator: {
    fontSize: 16,
    marginHorizontal: 4,
  },
  expiredContainer: {
    marginVertical: 8,
  },
  expiredButton: {
    padding: 10,
    backgroundColor: '#ffcccc',
    borderRadius: 8,
  },
  expiredButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default DealLink
