'use client';
import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react';

interface FormData {
  movie_name: string;
  budget: number;
  runtime: number;
  director_name: string;
  production_companies: string[];
  genres: string[];
  spoken_languages: string[];
  country: string;
  title_year: number;
  release_week: number;
  cast_size: number;
  crew_size: number;
  number_production_companies: number;
  director_count: number;
  writer_count: number;
  editor_count: number;
  sound_department_size: number;
  costume_department_size: number;
  editing_department_size: number;
  production_department_size: number;
  art_department_size: number;
  camera_department_size: number;
  vx_department_size: number;
  male_cast_count: number;
  female_cast_count: number;
  unstated_gender_cast_count: number;
  tagline: string;
  overview: string;
  [key: string]: number | string | string[];
}

interface Options {
  [key: string]: string[];
}


const MovieForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
      movie_name: "Dreamland",
      budget: 5000000,
      runtime: 130,
      director_name: "James Cameron",
      production_companies: ["Paramount"],
      genres: ["Action"],
      spoken_languages: ["English"],
      country: "United States of America",
      title_year: 2022,
      release_week: 4,
      cast_size: 50,
      crew_size: 120,
      number_production_companies: 1,
      director_count: 1,
      writer_count: 7,
      editor_count: 3,
      sound_department_size: 8,
      costume_department_size: 12,
      editing_department_size: 19,
      production_department_size: 5,
      art_department_size: 4,
      camera_department_size: 23,
      vx_department_size: 14,
      male_cast_count: 25,
      female_cast_count: 25,
      unstated_gender_cast_count: 0,
      tagline: "Beyond the Depths of Imagination",
      overview: "In the not-too-distant future, humanity faces an unprecedented challenge as rising sea levels threaten civilization. Renowned scientist and visionary explorer Dr. Elena Myles, played by a strong female lead, discovers an ancient underwater city that is not only uninhabited but also technologically advanced. With the help of her elite team of submariners and the state-of-the-art submersible Neptunes Arrow, Dr. Myles ventures into the depths of the Pacific Ocean to unlock the secrets of this submerged metropolis. Their journey becomes a race against time as they uncover the citys potential to save the world from impending doom, all while battling a rival expedition determined to claim the discovery for their nefarious purposes. Directed by James Cameron, this film combines stunning visuals of deep-sea ecosystems with thrilling action and a poignant message about environmental conservation and human resilience.",
  });



  const [options, setOptions] = useState<Options>({});

  useEffect(() => {
    fetch('/encoder_state.json')
      .then(response => response.json()).then(data => setOptions(data));

  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;

    if (target instanceof HTMLSelectElement && target.multiple) {
      const valueSet = new Set(formData[name] as string[]);

      if (valueSet.has(target.value)) {
        valueSet.delete(target.value);
      } else {
        valueSet.add(target.value);
      }

      setFormData(prev => ({
        ...prev,
        [name]: Array.from(valueSet)
      }));
    } else if (target.type === 'number') {
      const valueAsNumber = parseFloat(target.value);
      setFormData(prev => ({
        ...prev,
        [name]: valueAsNumber
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: target.value
      }));
    }
  };



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const { movie_name, ...dataToSend } = formData;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend) 
    };

    try {
        const response = await fetch('https://box-officer-predict-wap47zlzwq-uk.a.run.app/predict', requestOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); 
        console.log(data);
    } catch (error) {
        console.error('There was an error!', error);
    }
};


  return (
    <div className="bg-black min-h-screen w-full flex flex-col">
    <form onSubmit={handleSubmit} className="text-white flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Movie Name:</span>
          </label>
          <input type="string" name="movie_name" value={formData.movie_name} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Budget:</span>
          </label>
          <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Runtime:</span>
          </label>
          <input type="number" name="runtime" value={formData.runtime} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Title Year:</span>
          </label>
          <input type="number" name="title_year" value={formData.title_year} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Release Week:</span>
          </label>
          <input type="number" name="release_week" value={formData.release_week} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Cast Size:</span>
          </label>
          <input type="number" name="cast_size" value={formData.cast_size} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Crew Size:</span>
          </label>
          <input type="number" name="crew_size" value={formData.crew_size} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Number of Production Companies:</span>
          </label>
          <input type="number" name="number_production_companies" value={formData.number_production_companies} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Director Count:</span>
          </label>
          <input type="number" name="director_count" value={formData.director_count} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Writer Count:</span>
          </label>
          <input type="number" name="writer_count" value={formData.writer_count} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Editor Count:</span>
          </label>
          <input type="number" name="editor_count" value={formData.editor_count} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Sound Department Size:</span>
          </label>
          <input type="number" name="sound_department_size" value={formData.sound_department_size} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Costume Department Size:</span>
          </label>
          <input type="number" name="costume_department_size" value={formData.costume_department_size} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Editing Department Size:</span>
          </label>
          <input type="number" name="editing_department_size" value={formData.editing_department_size} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Production Department Size:</span>
          </label>
          <input type="number" name="production_department_size" value={formData.production_department_size} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Art Department Size:</span>
          </label>
          <input type="number" name="art_department_size" value={formData.art_department_size} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Camera Department Size:</span>
          </label>
          <input type="number" name="camera_department_size" value={formData.camera_department_size} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">VX Department Size:</span>
          </label>
          <input type="number" name="vx_department_size" value={formData.vx_department_size} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Male Cast Count:</span>
          </label>
          <input type="number" name="male_cast_count" value={formData.male_cast_count} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Female Cast Count:</span>
          </label>
          <input type="number" name="female_cast_count" value={formData.female_cast_count} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Unstated Gender Cast Count:</span>
          </label>
          <input type="number" name="unstated_gender_cast_count" value={formData.unstated_gender_cast_count} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Tagline:</span>
          </label>
          <input type="text" name="tagline" value={formData.tagline} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Overview:</span>
          </label>
          <input type="text" name="overview" value={formData.overview} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Director Name:</span>
          </label>
          <select
            name="director_name"
            value={formData.director_name}
            onChange={handleInputChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled value="">Select a director</option>
            {options.director_name?.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Country:</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled value="">Select a country</option>
            {options.country?.map(country => <option key={country} value={country}>{country}</option>)}
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Production Companies:</span>
          </label>
          <select
            multiple
            name="production_companies"
            value={formData.production_companies}
            onChange={handleInputChange}
            className="select select-bordered w-full max-w-xs"
            size={5}
          >
            {options.production_companies?.map(company => <option key={company} value={company}>{company}</option>)}
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Genres:</span>
          </label>
          <select
            multiple
            name="genres"
            value={formData.genres}
            onChange={handleInputChange}
            className="select select-bordered w-full max-w-xs"
            size={5}
          >
            {options.genres?.map(genre => <option key={genre} value={genre}>{genre}</option>)}
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Spoken Languages:</span>
          </label>
          <select
            multiple
            name="spoken_languages"
            value={formData.spoken_languages}
            onChange={handleInputChange}
            className="select select-bordered w-full max-w-xs"
            size={5}
          >
            {options.spoken_languages?.map(language => <option key={language} value={language}>{language}</option>)}
          </select>
        </div>

      </div>
      <button type="submit" className="btn btn-primary mt-4">Submit</button>
    </form>
    </div>

  );
};

export default MovieForm;