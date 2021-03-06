// <auto-generated>
// Code generated by Microsoft (R) AutoRest Code Generator.
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.
// </auto-generated>

namespace DataApi
{
    using Models;
    using System.Threading;
    using System.Threading.Tasks;

    /// <summary>
    /// Extension methods for Submissions.
    /// </summary>
    public static partial class SubmissionsExtensions
    {
            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='department'>
            /// Possible values include: 'Fao', 'Rnr', 'Bur'
            /// </param>
            /// <param name='status'>
            /// Possible values include: 'Pending', 'Approved', 'Rejected', 'Review',
            /// 'Issue', 'Complete'
            /// </param>
            public static object GetByDepartmentStatus(this ISubmissions operations, string department = default(string), string status = default(string))
            {
                return operations.GetByDepartmentStatusAsync(department, status).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='department'>
            /// Possible values include: 'Fao', 'Rnr', 'Bur'
            /// </param>
            /// <param name='status'>
            /// Possible values include: 'Pending', 'Approved', 'Rejected', 'Review',
            /// 'Issue', 'Complete'
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<object> GetByDepartmentStatusAsync(this ISubmissions operations, string department = default(string), string status = default(string), CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.GetByDepartmentStatusWithHttpMessagesAsync(department, status, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='submissionDTO'>
            /// </param>
            public static SubmissionDTO PostBySubmissionDTO(this ISubmissions operations, SubmissionDTO submissionDTO)
            {
                return operations.PostBySubmissionDTOAsync(submissionDTO).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='submissionDTO'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<SubmissionDTO> PostBySubmissionDTOAsync(this ISubmissions operations, SubmissionDTO submissionDTO, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.PostBySubmissionDTOWithHttpMessagesAsync(submissionDTO, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='submissionId'>
            /// </param>
            public static Submission GetBySubmissionId(this ISubmissions operations, int submissionId)
            {
                return operations.GetBySubmissionIdAsync(submissionId).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='submissionId'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<Submission> GetBySubmissionIdAsync(this ISubmissions operations, int submissionId, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.GetBySubmissionIdWithHttpMessagesAsync(submissionId, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='submissionId'>
            /// </param>
            /// <param name='submissionDTO'>
            /// </param>
            public static object PutBySubmissionIdSubmissionDTO(this ISubmissions operations, int submissionId, SubmissionDTO submissionDTO)
            {
                return operations.PutBySubmissionIdSubmissionDTOAsync(submissionId, submissionDTO).GetAwaiter().GetResult();
            }

            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='submissionId'>
            /// </param>
            /// <param name='submissionDTO'>
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<object> PutBySubmissionIdSubmissionDTOAsync(this ISubmissions operations, int submissionId, SubmissionDTO submissionDTO, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.PutBySubmissionIdSubmissionDTOWithHttpMessagesAsync(submissionId, submissionDTO, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

    }
}
