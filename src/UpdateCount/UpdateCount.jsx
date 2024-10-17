

export default function UpdateCount() {
  async function updateCount ( productId ,newCount) {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
         {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body:newCount
      });

      if (!res.ok) {
        throw new Error(
          "An error occurred"
        );
      }

      const data = await res.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error in cartAdd:", error.message);
      return error;
    }
  }
  return (
    <div>

    </div>

  )
}
