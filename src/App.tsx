import "./App.css";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './utils/validation-schema';
import { useState } from 'react';
import { ipStringToNumber, subnetMaskToBinary } from './utils/binary-conversion';
import { doSubnetting, getNetworkAddress, getNumberBitForSubnetting } from './utils/subnetting-functions';
import Table from "./components/Table";

interface INetworkData {
	ipAddress: string,
	subnetMask: number,
	numberSubnets: number
}

function App() {
	const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm<INetworkData>({
			resolver: yupResolver(validationSchema)
		})

	const [showTable, setShowTable] = useState<boolean>(false)
	const [subnets, setSubnets] = useState({})
	const [numberSubnets, setNumberSubnets] = useState<number>(0)

	const onSubmit: SubmitHandler<INetworkData> = (formData) => {
		const subnetMaskBinary = subnetMaskToBinary(formData.subnetMask)
		const ipAddress = ipStringToNumber(formData.ipAddress)
		const numberSubnets = formData.numberSubnets
		setNumberSubnets(numberSubnets)
		const newtorkAddress = getNetworkAddress(ipAddress, subnetMaskBinary)
		const nBitForSubnetting = getNumberBitForSubnetting(numberSubnets)
		const subnets = doSubnetting(newtorkAddress, formData.subnetMask, formData.numberSubnets, nBitForSubnetting)

		setSubnets(subnets)
		setShowTable(true)
	}

  return (
	<>
		<div className="container">
			<div className="input-container">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="input-container-one">
						<div>
							<label htmlFor="ip-address">IP Address:</label>
							<input
								type="text"
								id="ip-address"
								placeholder="(e.g., 192.168.5.0)"
								{...register("ipAddress")}
							/>
							{errors.ipAddress && <div className="form-error">{errors.ipAddress.message}</div>}
						</div>

						<div>
							<label htmlFor="subnet-mask">Subnet Mask:</label>
							<input
								type="text"
								id="subnet-mask"
								placeholder="(e.g., 24)"
								{...register("subnetMask")}
							/>
							{errors.subnetMask && <div className="form-error">{errors.subnetMask.message}</div>}
						</div>
					</div>
					<div className="input-container-two">
						<div>
							<label htmlFor="num-subnets">Number of Subnets:</label>
							<input
								type="number"
								id="num-subnets"
								min="1"
								{...register("numberSubnets")}
							/>
							{errors.numberSubnets && <div className="form-error">{errors.numberSubnets.message}</div>}
						</div>
						<button className="create-button" type="submit">Create</button>
					</div>
				</form>
			</div>
			
			{ subnets === false ? (
				<p className="subnetting-error">It is not possible to perform subnetting with the configured values.</p>
				) : (showTable && <Table subnets={subnets} numberSubnets={numberSubnets}/>)
			}	

			<p>Developed by <a href="https://github.com/emanu3l3">Emanuele</a></p>
		</div>
		
	</>
  );
}

export default App;
