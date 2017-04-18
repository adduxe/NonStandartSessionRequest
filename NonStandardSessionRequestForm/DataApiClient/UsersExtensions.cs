// Code generated by Microsoft (R) AutoRest Code Generator 0.16.0.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace DataApiClient
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Rest;
    using Models;

    /// <summary>
    /// Extension methods for Users.
    /// </summary>
    public static partial class UsersExtensions
    {
            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='uscId'>
            /// </param>
            public static object GetByUscId(this IUsers operations, string uscId)
            {
                return Task.Factory.StartNew(s => ((IUsers)s).GetByUscIdAsync(uscId), operations, CancellationToken.None, TaskCreationOptions.None, TaskScheduler.Default).Unwrap().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='uscId'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<object> GetByUscIdAsync(this IUsers operations, string uscId, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.GetByUscIdWithHttpMessagesAsync(uscId, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='uscId'>
            /// </param>
            /// <param name='user'>
            /// </param>
            public static object PutByUscIdUser(this IUsers operations, string uscId, FaoUser user)
            {
                return Task.Factory.StartNew(s => ((IUsers)s).PutByUscIdUserAsync(uscId, user), operations, CancellationToken.None, TaskCreationOptions.None, TaskScheduler.Default).Unwrap().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='uscId'>
            /// </param>
            /// <param name='user'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<object> PutByUscIdUserAsync(this IUsers operations, string uscId, FaoUser user, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.PutByUscIdUserWithHttpMessagesAsync(uscId, user, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='uscId'>
            /// </param>
            public static object DeleteByUscId(this IUsers operations, string uscId)
            {
                return Task.Factory.StartNew(s => ((IUsers)s).DeleteByUscIdAsync(uscId), operations, CancellationToken.None, TaskCreationOptions.None, TaskScheduler.Default).Unwrap().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='uscId'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<object> DeleteByUscIdAsync(this IUsers operations, string uscId, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.DeleteByUscIdWithHttpMessagesAsync(uscId, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='uscId'>
            /// </param>
            /// <param name='user'>
            /// </param>
            public static object PatchByUscIdUser(this IUsers operations, string uscId, FaoUser user)
            {
                return Task.Factory.StartNew(s => ((IUsers)s).PatchByUscIdUserAsync(uscId, user), operations, CancellationToken.None, TaskCreationOptions.None, TaskScheduler.Default).Unwrap().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='uscId'>
            /// </param>
            /// <param name='user'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<object> PatchByUscIdUserAsync(this IUsers operations, string uscId, FaoUser user, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.PatchByUscIdUserWithHttpMessagesAsync(uscId, user, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static object Get(this IUsers operations)
            {
                return Task.Factory.StartNew(s => ((IUsers)s).GetAsync(), operations, CancellationToken.None, TaskCreationOptions.None, TaskScheduler.Default).Unwrap().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<object> GetAsync(this IUsers operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.GetWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='user'>
            /// </param>
            public static object PostByUser(this IUsers operations, FaoUser user)
            {
                return Task.Factory.StartNew(s => ((IUsers)s).PostByUserAsync(user), operations, CancellationToken.None, TaskCreationOptions.None, TaskScheduler.Default).Unwrap().GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='user'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<object> PostByUserAsync(this IUsers operations, FaoUser user, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.PostByUserWithHttpMessagesAsync(user, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

    }
}
