import React from 'react';
import styled from 'styled-components';
import {WithOrganizations} from '../../containers/WithOrganization';
import {H1} from '../../components/H1';
import {CONFIG} from '../../config';




class Home extends React.Component {
//creating a table to iterate through data.organization.employments.edges, the array that contains the employees
    createTable = (mydata) => {
        let table = []
        for (let i = 0; i < mydata.edges.length; ++i ) {
          let children = []
          //accessing first and last name fields of (node) user
           children.push(<td>{`First Name: ${ mydata.edges[i].node.user.firstName}`}</td>)
          children.push(<td>{`Last Name: ${ mydata.edges[i].node.user.lastName}`}</td>)
          //some entries don't have either logic test score or team for the user so we make sure we dont stumble across them
          //could be letter improved with a try-catch maybe
          //it could also be done for the fields lastname and first name
          if (mydata.edges[i].node.user.employments.edges[0].node.teams.edges[0]!=null){
            children.push(<td>{`Team: ${ mydata.edges[i].node.user.employments.edges[0].node.teams.edges[0].node.team.name}`}</td>)
          }
          else{
            children.push(<td>{`Team:-`}</td>)
          }
          if (mydata.edges[i].node.user.logicTest.edges[0]!=null){
            children.push(<td>{`Logic Test Score: ${ mydata.edges[i].node.user.logicTest.edges[0].node.score}`  }</td>)
        }
          else{
            children.push(<td>{`Logic Test Score:-`}</td>)
          }
          table.push(<tr>{children}</tr>)
        }
        return table
      };
        

    renderError = (error) => {
        console.log(error)

        return (
            <div>
                <h1>Something went wrong</h1>
            </div>
        );
    };

    render() {

        return (
            <Wrapper>
                <H1>Home</H1>
                <WithOrganizations onError={this.renderError} organizationId={CONFIG.ORGANIZATION_ID}>
                    {({loading, data}) => {
                        if (loading) {
                            return <p>Loading</p>;
                        }

                
                        return (
                            <table>
                            {this.createTable(data.organization.employments)}
                            </table>
                        );
                    }}
                </WithOrganizations>
            </Wrapper>
        );
    }
}


const Wrapper = styled.div`
   padding: 24px;
`;


export default Home;
