// Code generated by Microsoft (R) AutoRest Code Generator 0.16.0.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace DataApi
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Rest;
    using Models;

    /// <summary>
    /// Extension methods for Payments.
    /// </summary>
    public static partial class PaymentsExtensions
    {
            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='uscId'>
            /// </param>
            /// <param name='payment'>
            /// </param>
            public static object PostByuscIdpayment(this IPayments operations, string uscId, Payment payment)
            {
                return Task.Factory.StartNew(s => ((IPayments)s).PostByuscIdpaymentAsync(uscId, payment), operations, CancellationToken.None, TaskCreationOptions.None, TaskScheduler.Default).Unwrap().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='uscId'>
            /// </param>
            /// <param name='payment'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<object> PostByuscIdpaymentAsync(this IPayments operations, string uscId, Payment payment, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.PostByuscIdpaymentWithHttpMessagesAsync(uscId, payment, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

    }
}
