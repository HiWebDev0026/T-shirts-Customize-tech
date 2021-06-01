import React from 'react';


function ShippingCosts(props) {
    return (
      <div className="Address">
        <table class="default">
          <tr>
            <td></td>
            <td>Capital Federal</td>
            <td>Elsewhere in the Country</td>
          </tr>
          <tr>
            <td>Less than 5 shirts</td>
            <td>$500</td>
            <td>$1000</td>
          </tr>
          <tr>
            <td>Less than 10 shirts</td>
            <td>$800</td>
            <td>$1500</td>
          </tr>
          <tr>
            <td>Less than 20 shirts</td>
            <td>$1500</td>
            <td>$3000</td>
          </tr>
        </table>
      </div>
    );
}
  
export default ShippingCosts;