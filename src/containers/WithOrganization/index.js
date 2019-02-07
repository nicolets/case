import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';




const GET_ORGANIZATIONS = gql`
 query( $id:ID!){ 
  organization(id:$id){
      id
    employments {
        pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor 
        }    
        edges {
            node {
                 user{
                    firstName
                    lastName
                    employments{
                        pageInfo {
                            hasNextPage
                            hasPreviousPage
                            startCursor
                            endCursor 
                            }
                            edges{
                                node{
                                    teams{
                                        pageInfo {
                                            hasNextPage
                                            hasPreviousPage
                                            startCursor
                                            endCursor 
                                            }
                                            edges{
                                                node{
                                                    team{
                                                        name
                                                    }
                                                }
                                            }

                                    }
                                }
                            }

                    }
                    logicTest{
                        pageInfo {
                            hasNextPage
                            hasPreviousPage
                            startCursor
                            endCursor 
                            }
                            edges{
                                node{
                                    score 
                                }
                            }
                    }

                   
                } 
                
            }
        }
    }

  }
}
`;

  


export class WithOrganizations extends React.Component{
    static propTypes = {
        children: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
        organizationId: PropTypes.string.isRequired
        
    };

    render() {
        const variables = {id: this.props.organizationId}

        return (
            <Query query={GET_ORGANIZATIONS} notifyOnNetworkStatusChange={true} variables={variables}>
                {({ data, loading, error}) => error ? this.props.onError(error) : 
                this.props.children({loading,  data})}
            </Query>
        );
    }
}

export default WithOrganizations;


