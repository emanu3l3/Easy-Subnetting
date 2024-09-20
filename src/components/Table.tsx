interface Subnet {
	networkAddress: number[],
	subnetMask: number[],
	defaultGateway: number[],
	broadcastAddress: number[],
	usableIps: string
}

interface Subnets {
  	[key: number]: Subnet;
}

interface TableProps {
  	subnets: Subnets,
    numberSubnets: number
}

const Table: React.FC<TableProps> = ({ subnets, numberSubnets }) => {
	const subnetEntries = Object.entries(subnets);
	return (
	<table className="subnet-table">
		<thead>
			<tr>
				<th>N. Subnet</th>
				<th>Network Address</th>
				<th>Subnet Mask</th>
				<th>Default Gateway</th>
				<th>IP Range</th>
				<th>Broadcast</th>
			</tr>
		</thead>
		<tbody>
			
		{subnetEntries.map(([key, value], index) => {
          return (
            <>
              <tr key={key}>
                <td>{parseInt(key) + 1}</td>
                <td>{value.networkAddress.join(".")}</td>
                <td>{value.subnetMask.join(".")}</td>
                <td>{value.defaultGateway.join(".")}</td>
                <td>{value.usableIps}</td>
                <td>{value.broadcastAddress.join(".")}</td>
              </tr>
              {(index + 1) % numberSubnets === 0 && index + 1 < subnetEntries.length && (
                <tr>
                  <td colSpan={6}>
                    <hr />
                  </td>
                </tr>
              )}
            </>
          );
        })}	
		</tbody>
	</table>

  );
}

export default Table;
