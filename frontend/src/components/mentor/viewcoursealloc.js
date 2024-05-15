import React from 'react';

const ViewCourseAlloc = () => {
  const [courses, setData] = useState([]);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const lid = localStorage.getItem('log_id');
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/mentorviewprofile',{params: {"LogID":lid}});
                console.log(response.data.data);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchData();
    }, []);
  return (
    <div>
      <h1>Course Allocation View</h1>
      <form id="form1" name="form1" method="post" action="/viewcorsalloc">
        <table width="200" border="1">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Courses Allocated</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{course.course_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ViewCourseAlloc;