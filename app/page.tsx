'use client';
import React, { useState, ChangeEvent, useEffect, FormEvent } from 'react';

interface FormData {
  budget: number;
  runtime: number;
  directorName: string;
  productionCompanies: string[];
  genres: string[];
  spokenLanguages: string[];
  country: string;
  titleYear: number;
  releaseWeek: number;
  castSize: number;
  crewSize: number;
  numberProductionCompanies: number;
  directorCount: number;
  writerCount: number;
  editorCount: number;
  soundDepartmentSize: number;
  costumeDepartmentSize: number;
  editingDepartmentSize: number;
  productionDepartmentSize: number;
  artDepartmentSize: number;
  cameraDepartmentSize: number;
  vxDepartmentSize: number;
  maleCastCount: number;
  femaleCastCount: number;
  unstatedGenderCastCount: number;
  tagline: string;
  overview: string;
  [key: string]: number | string | string[];
}

interface Options {
  [key: string]: string[];
}


const MovieForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    budget: 0,
    runtime: 0,
    directorName: '',
    productionCompanies: [],
    genres: [],
    spokenLanguages: [],
    country: '',
    titleYear: 0,
    releaseWeek: 0,
    castSize: 0,
    crewSize: 0,
    numberProductionCompanies: 0,
    directorCount: 0,
    writerCount: 0,
    editorCount: 0,
    soundDepartmentSize: 0,
    costumeDepartmentSize: 0,
    editingDepartmentSize: 0,
    productionDepartmentSize: 0,
    artDepartmentSize: 0,
    cameraDepartmentSize: 0,
    vxDepartmentSize: 0,
    maleCastCount: 0,
    femaleCastCount: 0,
    unstatedGenderCastCount: 0,
    tagline: '',
    overview: '',
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
    event.preventDefault(); // Prevent the default form submission behavior

    // Construct the headers and body of the request
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Convert the formData object to a JSON string
    };

    try {
        // Send the request to the endpoint
        const response = await fetch('https://box-officer-predict-wap47zlzwq-uk.a.run.app/predict', requestOptions);
        
        if (!response.ok) {
            // If the response is not 2xx, throw an error
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        console.log(data); // Log the data received from the server
    } catch (error) {
        console.error('There was an error!', error);
    }
};


  return (
    <div className="bg-black min-h-screen w-full flex flex-col">
    <form onSubmit={handleSubmit} className="text-white flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Styling for Budget input */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Budget:</span>
          </label>
          <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Repeat similar styling for other numerical inputs */}
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
          <input type="number" name="titleYear" value={formData.titleYear} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Release Week:</span>
          </label>
          <input type="number" name="releaseWeek" value={formData.releaseWeek} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Cast Size */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Cast Size:</span>
          </label>
          <input type="number" name="castSize" value={formData.castSize} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Crew Size */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Crew Size:</span>
          </label>
          <input type="number" name="crewSize" value={formData.crewSize} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Number of Production Companies */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Number of Production Companies:</span>
          </label>
          <input type="number" name="numberProductionCompanies" value={formData.numberProductionCompanies} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Director Count */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Director Count:</span>
          </label>
          <input type="number" name="directorCount" value={formData.directorCount} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Writer Count */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Writer Count:</span>
          </label>
          <input type="number" name="writerCount" value={formData.writerCount} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Editor Count */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Editor Count:</span>
          </label>
          <input type="number" name="editorCount" value={formData.editorCount} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Sound Department Size */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Sound Department Size:</span>
          </label>
          <input type="number" name="soundDepartmentSize" value={formData.soundDepartmentSize} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Costume Department Size */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Costume Department Size:</span>
          </label>
          <input type="number" name="costumeDepartmentSize" value={formData.costumeDepartmentSize} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Editing Department Size */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Editing Department Size:</span>
          </label>
          <input type="number" name="editingDepartmentSize" value={formData.editingDepartmentSize} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Production Department Size */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Production Department Size:</span>
          </label>
          <input type="number" name="productionDepartmentSize" value={formData.productionDepartmentSize} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Art Department Size */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Art Department Size:</span>
          </label>
          <input type="number" name="artDepartmentSize" value={formData.artDepartmentSize} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Camera Department Size */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Camera Department Size:</span>
          </label>
          <input type="number" name="cameraDepartmentSize" value={formData.cameraDepartmentSize} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* VX Department Size */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">VX Department Size:</span>
          </label>
          <input type="number" name="vxDepartmentSize" value={formData.vxDepartmentSize} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Male Cast Count */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Male Cast Count:</span>
          </label>
          <input type="number" name="maleCastCount" value={formData.maleCastCount} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Female Cast Count */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Female Cast Count:</span>
          </label>
          <input type="number" name="femaleCastCount" value={formData.femaleCastCount} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Unstated Gender Cast Count */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Unstated Gender Cast Count:</span>
          </label>
          <input type="number" name="unstatedGenderCastCount" value={formData.unstatedGenderCastCount} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Tagline */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Tagline:</span>
          </label>
          <input type="text" name="tagline" value={formData.tagline} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>

        {/* Overview */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Overview:</span>
          </label>
          <input type="text" name="overview" value={formData.overview} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" />
        </div>


        {/* Continue this pattern for each numerical input */}
        {/* Styling for Director Name select */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Director Name:</span>
          </label>
          <select
            name="directorName"
            value={formData.directorName}
            onChange={handleInputChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled value="">Select a director</option>
            {options.directorName?.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>

        {/* Styling for multiple select fields like Production Companies and Genres */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-white">Production Companies:</span>
          </label>
          <select
            multiple
            name="productionCompanies"
            value={formData.productionCompanies}
            onChange={handleInputChange}
            className="select select-bordered w-full max-w-xs"
            size={5}
          >
            {options.productionCompanies?.map(company => <option key={company} value={company}>{company}</option>)}
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
            name="spokenLanguages"
            value={formData.spokenLanguages}
            onChange={handleInputChange}
            className="select select-bordered w-full max-w-xs"
            size={5}
          >
            {options.spokenLanguages?.map(language => <option key={language} value={language}>{language}</option>)}
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
      </div>
      <button type="submit" className="btn btn-primary mt-4">Submit</button>
    </form>
    </div>

  );
};

export default MovieForm;