import { Client, Databases, ID, Query, Permission, Role } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query)
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      console.log("Document already exists. Updating count to:", existingMovie.count + 1);

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1
        }
      );
    } else {
      const newDocumentData = {
        searchTerm: query,
        movie_id: Number(movie.id),
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      };

      console.log("Creating movie document with:", newDocumentData);

      const doc = await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        newDocumentData,
        [
          Permission.read(Role.any()),
          Permission.update(Role.any())
        ]
      );

      console.log("Document created:", doc);
    }
  } catch (error) {
    console.log("Error occurred in updateSearchCount:", error);
    throw error;
  }
};
