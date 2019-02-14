<?php
class Store
{
	function __construct($file)
	{
		$this->file = $file;
		$this->data = $this->getDataFromFile($file);
	}

	public function Edit($path, &$value) {
	    $temp = &$this->data;
	    $path = $this->getParsedPath($path);
	    foreach($path as $key) {
	        $temp = &$temp[$key];
	    }
		$temp = $value;
		unset($temp);
	    $this->Save($this->data);
	}

	public function Insert($path, &$value) {
	    $temp = &$this->data;
	    $path = $this->getParsedPath($path);
	    foreach($path as $key) {
	        $temp = &$temp[$key];
	    }
	    array_push($temp, $value);
		unset($temp);
	    $this->Save($this->data);
	}

	public function Remove($path) {
	    $temp = &$this->data;
	    $path = $this->getParsedPath($path);
	    $index = array_pop($path);
	    foreach($path as $key) {
	        $temp = &$temp[$key];
	    }
		unset($temp[$index]);
	    $this->Save($this->data);
	}

	public function Move($path, $oldindex, $newindex) {
	    $temp = &$this->data;
	    $path = $this->getParsedPath($path);
	    foreach($path as $key) {
	        $temp = &$temp[$key];
	    }
	    $out = array_splice($temp, $oldindex, 1);
	    var_dump($out);
	    array_splice($temp, $newindex, 0, $out);
		unset($temp);
	    $this->Save($this->data);
	}

	public function Get($path) {
	    $temp = &$this->data;
	    $path = $this->getParsedPath($path);
	    foreach($path as $key) {
	        $temp = &$temp[$key];
	    }
		return $temp;
	}

	private function getParsedPath($path){
		$delimiter = '.';
		$pathParts = explode($delimiter, $path);
		return $pathParts;
	}

	private function getDataFromFile($file){
		$data = file_get_contents($file);
		$data = json_decode($data, true);
		return $data;
	}

	private function Save($data){
		if(!is_null($data)){
			$data = json_encode($data, JSON_PRETTY_PRINT);
			file_put_contents($this->file, $data);
		}
	}
}
?>